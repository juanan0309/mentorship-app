import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import { Button } from '@mui/material'
import Editor from 'rich-markdown-editor'
import { useSession } from 'next-auth/react'

import classes from './CreatePostPage.module.css'

const CreateInterviewPage = () => {
  const { data: session } = useSession()
  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          content: '',
        }}
        validate={(values) => {
          const errors = {} as {
            title: string | undefined
            content: string | undefined
          }
          if (!values.title) {
            errors.title = 'Required'
          }
          if (!values.content || values.content === '\\\n') {
            errors.content = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            title: values.title,
            content: values.content,
            ownerId: session?.user?.email,
          }
          fetch('/api/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((res) => {
              setSubmitting(false)
            })
            .catch((err) => {
              console.log('Error while creating a new post:', err.message)
              setSubmitting(false)
            })
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />
            <Editor
              placeholder="Write your interview tips here using MD"
              className={classes['markdown-field']}
              onChange={(e) => setFieldValue('content', e())}
            />
            <ErrorMessage name="content" component="div" />
            <Button
              type="submit"
              disabled={isSubmitting}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }

  return {
    props: {},
  }
}

export default CreateInterviewPage
