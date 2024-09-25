import { Form as FForm, Field, Formik, FormikHelpers, FormikProps } from 'formik'
import React, { useState } from 'react'
import { MediaForm } from '../misc/types'
import { Button, Form } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { createMedia, editMedia } from '../api-cilent'
import { useAppContext } from '../context/AppProvider'
import ExitButton from './ExitButton'
import InputField from './InputField'
import InputFileImage from './InputFileImage'
import { validationMediaSchema } from '../misc/config'

interface Props {
  onClose: () => void
  initialValues: MediaForm
  id: number
}

const AddMediaModal =
  ({
    onClose,
    initialValues,
    id,
  }: Props):
    React.JSX.Element => {
    const [image, setImage] = useState<File | null>(null)
    const isEdit = id >= 0

    const { showToast, fetchMedias } = useAppContext()
    const mutationAdd = useMutation(createMedia, {
      onSuccess: async () => {
        showToast({ message: "Create new social media succeed", type: "SUCCESS" })
        await fetchMedias()
        onClose()
      },
      onError: () => {
        showToast({ message: "Create new social media failed", type: "ERROR" })
      },
    })

    const mutationUpdate = useMutation(editMedia, {
      onSuccess: async () => {
        showToast({ message: "Media updated successfully", type: "SUCCESS" })
        await fetchMedias()
        onClose()
      },
      onError: () => {
        showToast({ message: "Update media failed", type: "ERROR" })
      },
    })
    const onSubmit = async (data: MediaForm, formik: FormikHelpers<MediaForm>) => {
      const formData: FormData = new FormData();
      formData.append("name_ar", data.name_ar)
      formData.append("name_he", data.name_he)
      formData.append("name_en", data.name_en)
      formData.append("show_link", String(data.show_link))

      if (image) {
        formData.append("img", image as Blob)
      }

      if (isEdit)
        await mutationUpdate.mutateAsync({ data: formData, id })
      else
        await mutationAdd.mutateAsync(formData)

      formik.setSubmitting(false)
    }

    const disabled = (formik: FormikProps<MediaForm>) => {
      if (isEdit) {
        if (formik.isSubmitting || (!formik.dirty && !image))
          return true
      }
      else if (!formik.isValid || formik.isSubmitting || !formik.dirty || !image)
        return true

      return false
    }

    return (
      <div className='add-media-modal'>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationMediaSchema}
        >
          {(formik) => {
            return (
              <FForm className='form bg-body-secondary py-4 px-4 rounded-3 text-black position-relative'>
                <h3 className='text-center my-3'>{isEdit ? "Edit" : "Add"} Media</h3>

                <InputField type='text' name='name_ar' dir='rtl' label='Arabic Name' styles='mb-3' labelStyle='text-black-50' />
                <InputField type='text' name='name_he' label='Hebrew Name' styles='mb-3' labelStyle='text-black-50' />
                <InputField type='text' name='name_en' label='English Name' styles='mb-3' labelStyle='text-black-50' />

                <InputFileImage
                  formStyle='mb-3'
                  labelStyle='text-black-50'
                  label='Icon'
                  name='img'
                  accept='.png'
                  setFunc={setImage}
                />

                <Form.Group className="d-flex align-items-center justify-content-between">
                  <Form.Label className='fw-medium mb-md-0 mb-0 text-black-50'>Show social media value?</Form.Label>
                  <div className="form-check form-switch">
                    <Field
                      type="checkbox"
                      id="show_link"
                      name="show_link"
                      className="form-check-input"
                    />
                    <Form.Label htmlFor="show_link" className="form-check-label"></Form.Label>
                  </div>
                </Form.Group>

                <Button
                  className='d-block mx-auto'
                  type='submit'
                  disabled={disabled(formik)}>
                  {formik.isSubmitting ? "Wait..." : isEdit ? "Edit" : "Add"}
                </Button>

                <ExitButton handleClick={onClose} />
              </FForm>
            )
          }}
        </Formik>
      </div>
    )
  }

export default AddMediaModal
