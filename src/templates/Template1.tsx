import React from 'react'
import { CustomerCard as Customer, LinkCard as Link } from '../misc/types'
import { isPhoneNumber } from '../misc/helpers'
import { Col, Row } from 'react-bootstrap'

interface Props {
  customer: Customer,
  links: Link[],
}

const Template1 = ({ customer, links }: Props): React.JSX.Element => {
  const returnHref = (link: string): string =>
    isPhoneNumber(link) ? `tel:${link}` : link

  return (
    <div id="template-1" className='template'>
      <Row
        className='align-items-start justify-content-center mx-auto flex-1'
      >
        {links.length > 0
          && links.map(link => (
            <Col
              xs={4}
              sm={4}
              md={3}
              key={link.SocialMedia.id}
              className='links-holder flex-center flex-column'
            >
              <a
                className='link p-1 bg-transparent rounded-circle flex-center overflow-hidden'
                href={returnHref(link.link)}
                style={{
                  borderColor: customer.button_color
                }}
              >
                <img
                  className="icon rounded-circle border border-1"
                  src={`data:image/jpeg;base64,${link.SocialMedia.img}`}
                  alt="icon" />
              </a>
              <p
                className={`mt-1 ${link.SocialMedia.show_link && "small"}`}
                style={{ color: customer?.text_color }}
              >{link.SocialMedia.show_link ? link.link : link.SocialMedia.name}
              </p>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default Template1
