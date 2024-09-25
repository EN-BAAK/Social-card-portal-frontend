import React, {  ReactNode } from 'react'

interface Props {
  onClick: () => void,
  top?: number | "auto"
  right?: number | "auto"
  bottom?: number | "auto"
  left?: number | "auto"
  children: ReactNode
}

const Button = ({ onClick, top = "auto", right = "auto", bottom = "auto", left = "auto", children }: Props): React.ReactNode => {
  return (
    <button className='my-btn' onClick={onClick} style={{ top, right, bottom, left }}>
      {children}
    </button>
  )
}

export default Button
