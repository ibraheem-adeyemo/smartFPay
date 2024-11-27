import React from 'react'
import { Button, Box, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const BackButton = () => {

    
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1); // Should work if there's history
      };

  return (
    <Button onClick={handleBack} bgColor='none' _hover={{bgColor:'none'}}>
        <Box _hover={{bgColor:'muted-blue'}} bgColor='primary-blue' p='4px' borderRadius='50%' mr='20px'>
            <FaArrowLeft fontSize={{xl:'1.5rem','2xl':'2rem','3xl':'2rem'}} color='white' />
        </Box>
        <Heading fontSize={{xl:'1.5rem', '2xl':'2rem','3xl':'2rem'}}>Back</Heading>
    </Button>
  )
}

export default BackButton