import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InputUserAccount from './InputUserAccount'

const controlManagementNav = () => {
  return (
    <Routes>
        <Route path='/' Component={<InputUserAccount />} />
    </Routes>
  )
}

export default controlManagementNav