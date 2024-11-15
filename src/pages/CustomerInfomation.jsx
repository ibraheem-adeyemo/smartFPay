import React from 'react'
import Layout from '../components/layouts/Layout'
import { Outlet } from 'react-router-dom'

const CustomerInfomation = () => {
  return (
    <Layout pageHeading='Customer Information'>
        <Outlet />
  </Layout>
  )
}

export default CustomerInfomation