import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { getCompanyDetails, getCustomerByDomain } from '../api-cilent'
import { Company, CustomerCard as customer, LinkCard as Link } from '../misc/types'
import Template1 from '../templates/Template1'
import ErrorRouter from '../components/ErrorRouter'
import Template2 from '../templates/Template2'
import { Container } from 'react-bootstrap'

const Cards = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [companyDetails, setCompanyDetails] = useState<Company | null>(null)
  const [customer, setCustomer] = useState<customer | null>(null)
  const [links, setLinks] = useState<Link[]>([])
  const { domain: customerDomain } = useParams()

  const fetchCustomerDetails = async (domain: string) => {
    setIsLoading(true)
    try {
      const data = await getCustomerByDomain(domain)
      setCustomer(data.customer)
      setLinks(data.links)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCompanyDetails = async () => {
    try {
      const data = await getCompanyDetails()
      setCompanyDetails(data)
    } catch {
      setCompanyDetails(null)
    }
  }

  const setData = async (domain: string | undefined) => {
    setIsLoading(true)
    if (domain)
      await fetchCustomerDetails(domain)
    await fetchCompanyDetails()
    setIsLoading(false)
  }

  const viewTemplate = () => {
    switch (customer?.template_type) {
      case "A": return <Template1 customer={customer} links={links} />
      case "B": return <Template2 customer={customer} links={links} />
      default: return <ErrorRouter />
    }
  }

  useEffect(() => {
    setData(customerDomain || "")
  }, [customerDomain])

  if (isLoading)
    return <Loading />

  if (!customer)
    return <ErrorRouter />;

  return (
    <div id='digital-card' className='h-full d-flex flex-column overflow-y-auto'
      style={{
        background:
          `linear-gradient(to bottom, ${customer.background_color_1},
        ${customer.background_color_2})`
      }}
    >

      <div className={`background-img-holder w-100 position-relative
      ${customer.logo && "has-logo"}
      ${customer.show_background_img && customer.background_img && "has-background-img"}
        `}>
        {customer.show_background_img && customer.background_img &&
          <img
            className='background-img w-100 h-100 d-block mx-auto rounded-bottom-3'
            src={`data:image/jpeg;base64,${customer.background_img}`}
            alt="background image" />
        }

        {
          customer.logo &&
          <div className="logo-holder">
            <img
              className={`logo w-100 h-100 rounded-circle object-fit-fill
        ${customer.show_background_img && customer.background_img ? "up" : ""}`}
              src={`data:image/jpeg;base64,${customer?.logo}`}
              alt="logo"
            />
          </div>
        }
      </div>

      <Container>
        <p
          className="fs-4 text-center fw-bold m-0"
          style={{ color: customer.text_color }}
        >
          {customer.name}
        </p>

        <p
          className="desc text-center mt-2 mb-3"
          style={{ color: customer.desc_color }}
        >
          {customer.desc}
        </p>
      </Container>

      {viewTemplate()}

      {companyDetails && (
        <p className='m-0 mt-4 w-100 company text-center'>
          <a
            className='fw-bold'
            style={{ color: customer.desc_color }}
            href={companyDetails.link}>{companyDetails.company_name}
          </a>
        </p>
      )}
    </div >
  )
}

export default Cards
