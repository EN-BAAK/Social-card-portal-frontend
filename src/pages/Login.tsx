import React, { useState } from 'react'
import { Button, } from 'react-bootstrap'
import { Form as FForm, Formik, FormikHelpers } from 'formik'
import * as Yup from "yup"
import { Login as LoginType } from '../misc/types'
import { useMutation, useQueryClient } from 'react-query'
import { login } from '../api-cilent'
import { useAppContext } from '../context/AppProvider'
import InputField from '../components/InputField'
import { useNavigate } from 'react-router-dom'

const initialValues: LoginType = {
  phone: "",
  password: ""
}

const validationSchema = Yup.object({
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required")
})


const Login = (): React.JSX.Element => {
  const [buttonMessage, setButtonMessage] = useState<string>("Login")
  const navigateTo = useNavigate()

  const { showToast } = useAppContext()
  const queryClient = useQueryClient()
  const mutation = useMutation(login, {
    onMutate: () => setButtonMessage("Wait..."),
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      showToast({ message: "Logged in successfully", type: "SUCCESS" })
      navigateTo("/medias")
    },
    onError: () => {
      showToast({ message: "Logging in failed", type: "ERROR" })
    },
    onSettled: () => {
      setButtonMessage("Login")
    }
  })

  const onSubmit = async (data: LoginType, formik: FormikHelpers<LoginType>) => {
    await mutation.mutateAsync(data)
    formik.setSubmitting(false)
  }

  return (
    <div id='login' className='d-flex justify-content-center align-items-center h-100'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <FForm className='form bg-body-secondary py-4 px-4 rounded-3 text-black'>
              <h3 className='text-center mb-3'>Login</h3>

              <InputField type="number" name="phone" placeholder='Mobile Number' styles='mb-3' />

              <InputField type="password" name="password" placeholder='Password' styles='mb-3' />

              <Button
                className='d-block mx-auto'
                type='submit'
                disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}>
                {buttonMessage}
              </Button>
            </FForm>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login
