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
  edit?: boolean
  post?: any
}

type dataProps = {
  title: string
  content: string
  ownerId: string
  likes?: {
    count: number
    users: string[]
  }
  postId?: string
}

const CreateForm = ({ router, session, edit = false, post }: iProps) => {
  return (
    <div>
      <Formik
        initialValues={{
          title: edit ? post?.title : '',
          content: edit ? post?.content : '',
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
          if (!session || !session.user) {
            Swal.fire({
              title: 'Error',
              text: 'You must be logged in to create a post',
              icon: 'error',
              confirmButtonText: 'Return',
            })
            return
          }
          const data: dataProps = {
            title: values.title,
            content: values.content,
            ownerId: session?.user?.email as string,
          }
          if (edit) {
            data.postId = post?._id
            data.likes = post?.likes
          }
          const fetchOptions = edit
            ? {
                method: 'PUT',
                message: 'Post edited',
                redirect: `/posts/${data.postId}`,
              }
            : { method: 'POST', message: 'Post created', redirect: '/' }

          fetch('/api/posts', {
            method: fetchOptions.method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((res) => {
              setSubmitting(false)
              if (res.error) {
                Swal.fire({
                  title: 'Error',
                  text: res.error,
                  icon: 'error',
                  confirmButtonText: 'Return',
                }).then(() => router.push(fetchOptions.redirect))
              } else {
                Swal.fire({
                  title: 'Thank you!',
                  text: fetchOptions.message,
                  icon: 'success',
                  confirmButtonText: 'Go Back',
                }).then(() => router.push(fetchOptions.redirect))
              }
            })
            .catch((err) => {
              console.log('Error while creating a new post:', err.message)
              setSubmitting(false)
              Swal.fire({
                title: 'Oops!',
                text: 'There was an error with your post, please try again',
                icon: 'error',
                confirmButtonText: 'Return',
              })
            })
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className={classes.form}>
            <p>Interview Tips Title</p>
            <ErrorMessage
              name='title'
              component='div'
              className={classes.error}
            />
            <Field type='text' name='title' className={classes.field} />
            <p>Content</p>
            <ErrorMessage
              name='content'
              component='div'
              className={classes.error}
            />
            <ReactQuill
              onChange={(e) => setFieldValue('content', e)}
              className={classes['markdown-field']}
              defaultValue={edit ? post?.content : ''}
            />
            <Button
              type='submit'
              disabled={isSubmitting}
              color='primary'
              variant='contained'
              className={classes.button}
            >
              {edit ? 'Update' : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateForm
