import React from 'react'
import { Form } from 'react-bootstrap'
import { ErrorMessage, Field } from 'formik'
import TextError from './TextError'

interface Props {
  dataSet: { id: string, value: string, label: string }[]
  name: string
  formStyle?: string,
  labelStyle?: string,
  optionHolderStyle?: string,
  label: string,
  optionStyle: string,
  selectedValue: string
}

const InputRadio = ({ dataSet, selectedValue, name, formStyle, optionStyle, labelStyle, label, optionHolderStyle }: Props): React.ReactNode => {
  return (
    <React.Fragment>
      <Form.Group className={formStyle}>
        <Form.Label className={labelStyle}>{label}:</Form.Label>
        <div className={optionHolderStyle}>
          {dataSet.map((data) => (
            <div
              key={data.id}
              className="option">
              <Field type="radio" id={data.id} name={name} value={data.value} className="form-check-input" />
              <Form.Label
                htmlFor={data.id}
                className={`${optionStyle} ${selectedValue === data.value ? "active" : ""}`}>
                {data.label}
              </Form.Label>
            </div>
          ))}
        </div>
      </Form.Group>
      <ErrorMessage name={name}>
        {msg => <TextError msg={msg} />}
      </ErrorMessage>
    </React.Fragment>
  )
}

export default InputRadio
