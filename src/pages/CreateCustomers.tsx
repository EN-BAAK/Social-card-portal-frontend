import { Formik, Form as FForm, Field, FormikProps, FormikHelpers } from 'formik'
import { Button, Col, Form, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Customer, Link } from '../misc/types'
import InputField from '../components/InputField'
import { useAppContext } from '../context/AppProvider'
import Loading from '../components/Loading'
import InputFileImage from '../components/InputFileImage'
import InputRadio from '../components/InputRadio'
import { initialCustomerValue, languages, templates, validationCustomerSchema } from '../misc/config'
import LinkBox from '../components/LinkBox'
import { useMutation } from 'react-query'
import { createCustomer, editCustomer, getCustomerById } from '../api-cilent'
import { useNavigate, useParams } from 'react-router-dom'

const CreateCustomers = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [backgroundImg, setBackgroundImg] = useState<File | null>(null)
  const [logo, setLogo] = useState<File | null>(null)
  const [initialValues, setInitialValues] = useState<Customer>(initialCustomerValue)
  const [links, setLinks] = useState<Link[]>([])
  const [letLogo, setLetLogo] = useState<boolean>(true)

  const { id: customerId } = useParams()
  const { fetchMedias, medias, showToast, fetchCustomers } = useAppContext();
  const navigateTo = useNavigate()
  const mutationCreate = useMutation(createCustomer, {
    onSuccess: async () => {
      showToast({ message: "Create new customer succeed", type: "SUCCESS" })
      await fetchCustomers()
      navigateTo("/customers")
    },
    onError: () => {
      showToast({ message: "Create new customer failed | May the domain name is already exist", type: "ERROR" })
    },
  })
  const mutationUpdate = useMutation(editCustomer, {
    onSuccess: async () => {
      showToast({ message: "Edit customer succeed", type: "SUCCESS" })
      await fetchCustomers()
      navigateTo("/customers")
    },
    onError: () => {
      showToast({ message: "Edit customer failed | May the domain name is already exist", type: "ERROR" })
    },
  })

  const create = async (form: FormData) => {
    await mutationCreate.mutateAsync(form)
  };
  const edit = async (form: FormData) => {
    await mutationUpdate.mutateAsync({ form, id: Number(customerId) })
  }


  const onSubmit = async (data: Customer, formik: FormikHelpers<Customer>) => {
    if (!advancedValidate(data)) {
      formik.setSubmitting(false)
      return;
    }

    const customerForm = new FormData();
    customerForm.append("name", data.name);
    customerForm.append("domain_name", data.domain_name.replace(/\s+/g, '').trim());
    customerForm.append("desc", data.desc);
    customerForm.append("desc_color", data.desc_color);

    if (logo) {
      customerForm.append("logo", logo as Blob);
    }

    customerForm.append("show_background_img", String(data.show_background_img));

    if (data.show_background_img && backgroundImg)
      customerForm.append("background_img", backgroundImg as Blob);


    customerForm.append("text_color", data.text_color);
    customerForm.append("background_color_1", data.background_color_1);
    customerForm.append("background_color_2", data.background_color_2);
    customerForm.append("button_color", data.button_color);
    customerForm.append("language", data.language);
    customerForm.append("template_type", data.template_type);
    customerForm.append("let_logo", String(letLogo));

    customerForm.append("medias", JSON.stringify(links))

    if (customerId)
      await edit(customerForm)
    else
      await create(customerForm)

    formik.setSubmitting(false)
  }

  const fetchMediasData = async () => {
    setIsLoading(true)
    await fetchMedias()
    setIsLoading(false)
  }
  const fetchSpecificUser = async (id: number) => {
    setIsLoading(true)
    const customer = await getCustomerById(id)
    setInitialValues(customer.customer)
    setLinks(customer.customer.links)
    setIsLoading(false)
  }
  const handleMediaSelect = (mediaId: number) => {
    setLinks((prevLinks) => [...prevLinks, { mediaId, link: "" }]);
  };

  const mediaById = (mediaId: number) => {
    const index = medias.findIndex(media => media.id === mediaId)
    return medias[index].name_en
  }
  const handleLinkChange = (id: number, value: string) => {
    setLinks(prevLinks => prevLinks.map(link =>
      link.mediaId === id ? { ...link, link: value } : link
    ));
  };
  const handleLinkRemove = (id: number) => {
    const index = links.findIndex(media => media.mediaId === id)
    const newLinks = [...links]
    newLinks.splice(index, 1)
    setLinks([...newLinks])
  }
  const disabled = (formik: FormikProps<Customer>): boolean => {
    if (customerId) {
      if (formik.isSubmitting || (!formik.dirty && !logo && !backgroundImg && (initialValues.links == links) && letLogo === true))
        return true
    }

    else if (formik.isSubmitting || !formik.isValid
      || !formik.dirty
    )
      return true

    return false
  }
  const advancedValidate = (data: Customer) => {
    if (data.domain_name == "create-customer" || data.domain_name == "dashboard" || data.domain_name == "medias" || data.domain_name == "customers") {
      showToast({ message: "You can't add domain with this names ['create-customer', 'dashboard', 'medias', 'customers']", type: "ERROR" })
      return false
    }
    if (!customerId && data.show_background_img && !backgroundImg) {
      showToast({ message: "Please add a background image", type: "ERROR" })
      return false
    }
    return true
  }
  useEffect(() => {
    if (medias && medias.length === 0 && !isLoading)
      fetchMediasData()

    if (customerId) {
      fetchSpecificUser(Number(customerId))
    }

  }, [customerId])

  if (isLoading)
    return <Loading />

  return (
    <div id='create-customer'>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={validationCustomerSchema}
      >
        {(formik) => {
          return (
            <FForm className='form h-screen overflow-y-auto overflow-x-hidden py-4 px-4 text-black position-relative text-nowrap'>
              <h3 className='my-3'>{customerId ? "Edit" : "Add"} Customer {customerId && `${initialValues.name}`}</h3>
              <Row className='g-3 align-items-center'>
                <Col sm={12} className='mb-2'>
                  <InputField type='text' name='name' label='Customer Name' labelStyle='color-label fw-medium mb-md-0 mb-0 text-black-50' innerDivStyle='d-flex align-items-sm-center flex-sm-row flex-column' />
                </Col>

                <Col sm={12} className='mb-2'>
                  <InputField type='text' name='domain_name' label='Domain Name' labelStyle='color-label fw-medium mb-md-0 mb-0 text-black-50' innerDivStyle='d-flex align-items-sm-center flex-sm-row flex-column' />
                </Col>

                <Col sm={12} className='mb-2'>
                  <InputField type='text' name='desc' label='Description' labelStyle='color-label fw-medium mb-md-0 mb-0 text-black-50' innerDivStyle='d-flex align-items-sm-center flex-sm-row flex-column' />
                </Col>

                <Col sm={12} className='d-flex align-items-md-center gap-2 flex-md-row flex-column' >
                  <InputFileImage
                    contentStyle='d-flex align-items-md-center flex-md-row flex-column'
                    name='logo'
                    setFunc={setLogo}
                    label='Logo'
                    labelStyle='fw-medium text-black-50'
                  />
                  {customerId
                    &&
                    <div className='save-prev-logo'>
                      <label htmlFor='save-prev-logo' className='fw-medium text-black-50'>Save prev logo? </label>
                      <input
                        id='save-prev-logo'
                        type="checkbox"
                        checked={letLogo}
                        onChange={() => setLetLogo(!letLogo)}
                      />
                    </div>
                  }
                </Col>

                <Col sm={6}>
                  <InputField name='text_color' label='Text Color' type='color' labelStyle='color-label fw-medium mb-md-0 mb-0 text-black-50' innerDivStyle='flex-center-y' />
                </Col>

                <Col sm={6}>
                  <InputField name='desc_color' label='Description Color' type='color' labelStyle='color-label fw-medium mb-md-0 mb-0 text-black-50' innerDivStyle='flex-center-y' />
                </Col>

                <Col sm={6}>
                  <InputField name='button_color' label='Button Color' type='color' labelStyle='color-label fw-medium mb-md-0 mb-0 text-black-50' innerDivStyle='flex-center-y' />
                </Col>

                <Col sm={6}>
                  <InputField name='background_color_1' label='Background Color 1' type='color' labelStyle='color-label fw-medium mb-md-0 mb-0 text-black-50' innerDivStyle='flex-center-y' />
                </Col>

                <Col sm={6}>
                  <InputField name='background_color_2' label='Background Color 2' type='color' labelStyle='color-label fw-medium mb-md-0 mb-0 text-black-50' innerDivStyle='flex-center-y' />
                </Col>

                <Col sm={7} lg={6}>
                  <Form.Group className="d-flex align-items-center justify-content-between">
                    <Form.Label className='fw-medium mb-md-0 mb-0 text-black-50'>Show Background Image:</Form.Label>
                    <div className="form-check form-switch">
                      <Field
                        type="checkbox"
                        id="show_background_img"
                        name="show_background_img"
                        className="form-check-input"
                      />
                      <Form.Label htmlFor="show_background_img" className="form-check-label"></Form.Label>
                    </div>
                  </Form.Group>
                </Col>

                {formik.values.show_background_img && (
                  <Col md={12} lg={6}>
                    <InputFileImage
                      contentStyle='d-flex align-items-md-center flex-md-row flex-column'
                      name='background_img'
                      setFunc={setBackgroundImg}
                      label='Background Image'
                      labelStyle='fw-medium mb-md-0 mb-0 text-black-50'
                      disable={!formik.values.show_background_img}
                    />
                  </Col>
                )}

                <Col sm={12} className='options-holder'>
                  <InputRadio
                    formStyle='mb-2 d-flex justify-content-md-between align-items-md-center flex-md-row flex-column'
                    labelStyle='fw-medium mb-md-0 mb-2 text-black-50'
                    label='Language'
                    optionHolderStyle='options flex-center-y justify-content-md-between gap-3'
                    name='language'
                    optionStyle={`form-check-label rounded-pill text-center text-white pointer transition-3 m-0`}
                    selectedValue={formik.values.language}
                    dataSet={languages}
                  />
                </Col>

                <Col sm={12} className='options-holder'>
                  <InputRadio
                    formStyle='mb-2 d-flex justify-content-md-between align-items-md-center flex-md-row flex-column'
                    labelStyle='fw-medium mb-md-0 mb-2 text-black-50'
                    label='Language'
                    optionHolderStyle='options flex-center-y justify-content-md-between gap-3'
                    name='template_type'
                    optionStyle={`form-check-label rounded-pill text-center text-white pointer transition-3 m-0`}
                    selectedValue={formik.values.template_type}
                    dataSet={templates}
                  />
                </Col>

                <Col sm={12}>
                  <label className='text-black-50 fw-medium'>Select Social Medias</label>
                  <select
                    className='border border-2 rounded-1 px-sm-4 px-1 py-1'
                    onChange={(e) => {
                      const selectedMediaId = parseInt(e.target.value, 10);
                      handleMediaSelect(selectedMediaId);
                    }}
                  >
                    <option value="">Social Medias</option>
                    {medias.length > 0 &&
                      medias
                        .filter((media) => !links.some(link => link.mediaId === media.id))
                        .map((media) => (
                          <option key={media.id} value={media.id}>
                            {media.name_en}
                          </option>
                        ))}
                  </select>
                </Col>

                {links.length > 0 &&
                  links.map(link => (
                    <Col md={6} key={link.mediaId}>
                      <LinkBox
                        value={link.link}
                        id={link.mediaId}
                        label={mediaById(link.mediaId)}
                        onValueChange={handleLinkChange}
                        onDelete={() => handleLinkRemove(link.mediaId)}
                      />
                    </Col>
                  ))}

                <Button
                  className='d-block'
                  type='submit'
                  disabled={disabled(formik)}
                >
                  {formik.isSubmitting ? "Wait..." : customerId ? "Edit" : "Add"}
                </Button>
              </Row>
            </FForm>
          )
        }}
      </Formik>
    </div >
  )
}

export default CreateCustomers