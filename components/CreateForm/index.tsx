import { Formik, Field, ErrorMessage, Form } from 'formik'
import Swal from 'sweetalert2'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import { Button } from '@mui/material'
import { NextRouter } from 'next/router'
import { Session } from 'next-auth'

import classes from './CreateForm.module.css'

interface iProps {
    router: NextRouter
    session: Session | null
}

const CreateForm = ({router, session}: iProps) => {
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
              errors.title = 'Title is required'
            }
            if (!values.content || values.content === '<p><br></p>') {
              errors.content = 'Content is required'
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
                Swal.fire({
                  title: 'Thank you!',
                  text: 'Posted successfully',
                  icon: 'success',
                  confirmButtonText: 'Go to Home'
                })
                .then(
                  () => router.push(`/`)
                )
              })
              .catch((err) => {
                console.log('Error while creating a new post:', err.message)
                setSubmitting(false)
                Swal.fire({
                  title: 'Oops!',
                  text: 'There was an error with your post, please try again',
                  icon: 'error',
                  confirmButtonText: 'Return'
                })
              })
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className={classes.form}>
              <p>Interview Tips Title</p>
              <ErrorMessage name="title" component="div" className={classes.error}/>
              <Field type="text" name="title" className={classes.field}/>
              <p>Content</p>
              <ErrorMessage name="content" component="div" className={classes.error} />
              <ReactQuill
                onChange={(e) => setFieldValue('content', e)}
                className={classes['markdown-field']}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }

  export default CreateForm