import React from 'react'
import Layout from '../components/layouts/Layout'
import { Outlet } from 'react-router-dom';

const ControlManagement = () => {
    
  return (
    <Layout pageHeading='Controle Management'>
        <Outlet />
    </Layout>
  )
}

export default ControlManagement