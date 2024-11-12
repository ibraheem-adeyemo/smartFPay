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
    <Button onClick={handleBack} bgColor='none'  _hover={{bgColor:'none'}}>
        <Box _hover={{bgColor:'muted-blue'}} bgColor='primary-blue' p='7px' borderRadius='50%' mr='20px'>
            <FaArrowLeft fontSize='23px' color='white' />
        </Box>
        <Heading>Back</Heading>
    </Button>
  )
}

export default BackButton