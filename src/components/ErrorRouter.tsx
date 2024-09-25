import React from 'react'

const ErrorRouter = (): React.JSX.Element => {
  return (
    <div className='p-5 bg-light-subtle'>
      <h1 className='text-danger fw-bold text-uppercase '>Error</h1>
      <h2 className='mt-3 fw-bold text-capitalize'>
        This page is not exist
        <span className='ps-3 fs-1'>404</span>
      </h2>
    </div>
  )
}

export default ErrorRouter
