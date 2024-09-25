import React from 'react';
import { Button } from 'react-bootstrap';
import { TiMinus } from "react-icons/ti";

interface Props {
  onValueChange: (id: number, value: string) => void;
  onDelete: () => void
  label: string;
  id: number;
  value: string
}

const LinkBox = ({ onValueChange, label, id, value, onDelete }: Props): React.JSX.Element => {
  return (
    <div className='link-box card p-0 overflow-hidden'>
      <div className="card-body flex-center-y p-0 h-100">
        <label className='link-label ps-3 fw-bold bg-white'>{label}:</label>
        <input
          type="text"
          value={value}
          className="form-control"
          placeholder={`Link ${label}`}
          onChange={(e) => onValueChange(id, e.target.value)}
        />
        <Button
          onClick={onDelete}
          className='rounded-0'>
          <TiMinus />
        </Button>
      </div>
    </div>
  );
};

export default LinkBox;
