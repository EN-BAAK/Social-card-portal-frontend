import React from 'react'
import { Button } from 'react-bootstrap'
import { HiXMark } from "react-icons/hi2";

interface Props {
  handleClick: () => void
}

const ExitButton = ({ handleClick }: Props): React.ReactNode => {
  return (
    <Button type='button' className='exit-btn' onClick={handleClick}>
      <HiXMark />
    </Button>
  )
}

export default ExitButton
