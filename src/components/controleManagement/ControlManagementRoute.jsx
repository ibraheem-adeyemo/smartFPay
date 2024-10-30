import React from 'react'
import { Route } from 'react-router-dom'
import InputUserAccount from './InputUserAccount'

const ControlManagementRoute = () => {
  return (
    <React.Fragment>
        <Route to="" component={<InputUserAccount />} />
    </React.Fragment>
  )
}

export default ControlManagementRoute