import React from 'react'
import Layout from '../components/layouts/Layout'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import InputUserAccount from '../components/controleManagement/Index.jsx'
import { FaArrowLeft } from "react-icons/fa6";
import { useRoutes, useNavigate } from 'react-router-dom';

const ControlManagement = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1); // Should work if there's history
      };

  return (
    <Layout pageHeading='Controle Management'>
        <InputUserAccount   />
    </Layout>
  )
}

export default ControlManagement