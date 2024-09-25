import React from 'react'
import { Form } from 'react-bootstrap'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

interface Props {
  name: string,
  label?: string,
  labelStyle?: string
  type: "text" | "color" | "number" | "password",
  styles?: string,
  placeholder?: string
  dir?: string
  innerDivStyle?: string
}

const InputField = ({ name, label, type, styles, labelStyle, placeholder, dir, innerDivStyle }: Props): React.ReactNode => {
  return (
    <Form.Group className={styles}>
      <div className={innerDivStyle}>
        {label
          && <Form.Label className={labelStyle}>{label}:</Form.Label>}
        <Field
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          dir={dir}
        />
      </div>
      <ErrorMessage name={name}>
        {msg => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  )
}

export default InputField
