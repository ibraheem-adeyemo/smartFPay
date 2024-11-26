import React from 'react'
import Layout from '../layouts/Layout'
import { Outlet } from 'react-router-dom';

const ControlManagement = () => {
    
  return (
    <Layout pageHeading='Control Management'>
        <Outlet />
    </Layout>
  )
}

export default ControlManagement