import React from 'react'
import {Spinner} from 'react-bootstrap'
const Loader = () => {
  return (
    <Spinner
    animation="border"
    role="status"
    variant='light'
    style={{
        width:"70px",
        height:"70px",
        display:"block",
        margin: "auto"
    }}
  />
  )
}

export default Loader