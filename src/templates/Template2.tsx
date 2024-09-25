import React from 'react'
import { CustomerCard as Customer, LinkCard as Link } from '../misc/types'
import { isPhoneNumber } from '../misc/helpers'
import { Col, Row } from 'react-bootstrap'

interface Props {
  customer: Customer,
  links: Link[],
}

const Template2 = ({ customer, links }: Props): React.JSX.Element => {
  const returnHref = (link: string): string =>
    isPhoneNumber(link) ? `tel:${link}` : link

  return (
    <div
      id="template-2" className='template'
    >

      <Row
        className='justify-content-start align-items-center mx-auto flex-1 px-2 gap-2'
      >
        {links.length > 0
          && links.map((link) => (
            <Col
              xs={12}
              sm={12}
              key={link.SocialMedia.id}
              className='links-holder rounded-3 mx-auto'
              style={{ backgroundColor: customer.button_color }}
            >
              <a
                href={returnHref(link.link)}
                className='link w-100 h-100 px-4 py-2 flex-center position-relative rounded-3'
              >
                <img
                  className="icon rounded-circle"
                  src={`data:image/jpeg;base64,${link.SocialMedia.img}`}
                  alt="icon" />

                <p
                  className={`flex-grow-1 text-center m-0 fw-medium ${link.SocialMedia.show_link && "small"}`}
                  style={{ color: customer.text_color }}
                >
                  {link.SocialMedia.show_link ? link.link : link.SocialMedia.name}
                </p>

              </a>
            </Col>
          ))
        }
      </Row>

    </div>
  )
}

export default Template2
