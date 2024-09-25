import React from 'react';
import { Form } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import TextError from './TextError';
import { handleImageFormChange } from '../misc/helpers';

interface Props {
  formStyle?: string;
  contentStyle?: string;
  labelStyle?: string;
  name: string;
  label?: string;
  disable?: boolean,
  accept?: string,
  setFunc: React.Dispatch<React.SetStateAction<File | null>>;
}

const InputFileImage = ({ formStyle, disable, contentStyle, labelStyle, name, label, setFunc, accept = "image/*" }: Props): React.ReactNode => {
  return (
    <Form.Group className={formStyle}>
      <div className={contentStyle}>
        {label && <Form.Label className={labelStyle}>{label}:</Form.Label>}
        <input
          type="file"
          name={name}
          className="form-control"
          accept={accept}
          disabled={disable}
          onChange={(e) => handleImageFormChange(e, setFunc)}
        />
      </div>
      <ErrorMessage name={name}>
        {msg => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  );
};

export default InputFileImage;