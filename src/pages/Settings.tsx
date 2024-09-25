import React, { useState } from 'react';
import { useAppContext } from '../context/AppProvider';
import { useMutation } from 'react-query';
import { Button, Container, } from 'react-bootstrap'
import { Form as FForm, Formik, FormikHelpers } from 'formik'
import * as Yup from "yup"
import { EditPassword, EditPhoneNumber } from '../misc/types';
import { editPassword, editPhone } from '../api-cilent';
import InputField from '../components/InputField';

const editPhoneInitialValues: EditPhoneNumber = {
  phone: "",
  newPhone: "",
  password: "",
}

const editPasswordInitialValues: EditPassword = {
  phone: "",
  password: "",
  newPassword: "",
}

const editPhoneValidationSchema = Yup.object({
  phone: Yup.string().required("Your current number is required"),
  newPhone: Yup.string().required("New number is required"),
  password: Yup.string().required("Password is required")
})

const editPasswordValidationSchema = Yup.object({
  phone: Yup.string().required("Your phone number is required"),
  password: Yup.string().required("Your current password is required"),
  newPassword: Yup.string().required("You new Password is required")
})

const Settings = (): React.JSX.Element => {
  const [submitButton, editSubmitButton] = useState<string>("Edit")

  const { showToast } = useAppContext()
  const editPhoneMutation = useMutation(editPhone, {
    onMutate: () => editSubmitButton("Wait..."),
    onSuccess: async () => {
      showToast({ message: "Your mobile number edited successfully", type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: "Edit mobile number failed", type: "ERROR" })
    },
    onSettled: () => {
      editSubmitButton("Edit")
    }
  })
  const editPasswordMutation = useMutation(editPassword, {
    onMutate: () => editSubmitButton("Wait..."),
    onSuccess: async () => {
      showToast({ message: "Your password edited successfully", type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: "Edit password number failed", type: "ERROR" })
    },
    onSettled: () => {
      editSubmitButton("Edit")
    }
  })

  const EditPhoneSubmit = async (data: EditPhoneNumber, formik: FormikHelpers<EditPhoneNumber>) => {
    await editPhoneMutation.mutateAsync(data)
    formik.setSubmitting(false)
    formik.resetForm()
  }
  const EditPasswordSubmit = async (data: EditPassword, formik: FormikHelpers<EditPassword>) => {
    await editPasswordMutation.mutateAsync(data)
    formik.setSubmitting(false)
    formik.resetForm()
  }

  return (
    <div id='settings'
      className="flex-center h-screen">
      <Container className='flex-center'>
        <div className="card">
          <div className="card-header">
            <h1 className="text-center my-4">Settings</h1>
          </div>

          <div className="card-body d-flex align-items-center flex-column flex-md-row gap-md-4">
            <Formik
              initialValues={editPhoneInitialValues}
              validationSchema={editPhoneValidationSchema}
              onSubmit={EditPhoneSubmit}
            >
              {(formik) => {
                return (
                  <FForm className='form mb-md-0 mb-3'>
                    <h4 className="text-center">Edit mobile number</h4>

                    <InputField type="number" name='phone' placeholder='Current mobile number' styles='mb-3' />
                    <InputField type="number" name='newPhone' placeholder='New mobile number' styles='mb-3' />
                    <InputField type="password" name='password' placeholder='Password' styles='mb-3' />

                    <Button
                      className='d-block mx-auto'
                      type='submit'
                      disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}>
                      {submitButton}
                    </Button>
                  </FForm>
                )
              }}
            </Formik>

            <Formik
              initialValues={editPasswordInitialValues}
              validationSchema={editPasswordValidationSchema}
              onSubmit={EditPasswordSubmit}
            >
              {(formik) => {
                return (
                  <FForm className='form'>
                    <h4 className="text-center">Edit password</h4>

                    <InputField type="number" name='phone' placeholder='Mobile number' styles='mb-3' />
                    <InputField type="password" name='password' placeholder='Password' styles='mb-3' />
                    <InputField type="password" name='newPassword' placeholder='New Password' styles='mb-3' />

                    <Button
                      className='d-block mx-auto'
                      type='submit'
                      disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}>
                      {submitButton}
                    </Button>
                  </FForm>
                )
              }}
            </Formik>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Settings;