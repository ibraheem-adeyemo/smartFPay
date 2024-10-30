import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const CardControle = () => {
    function handleBack(): void {
        // throw new Error('Function not implemented.')
    }

  return (
    <Box>
        <Flex mb='32px' alignItems='center'>
            <Button onClick={handleBack} bgColor='white'  _hover={{bgColor:'white'}}>
                <Box _hover={{bgColor:'muted-blue'}} bgColor='primary-blue' p='7px' borderRadius='50%' mr='20px'>
                    <FaArrowLeft fontSize='23px' color='white' />
                </Box>
                <Heading>Back</Heading>
            </Button>
        </Flex>
        <Flex gap="32px">
            <Box width='624px' border="1px solid" borderColor="main_light_gray" borderRadius='8px' p='24px' height='400px'>
                {/* <InputUserAccount /> */}
            </Box>
            <Box width='469px'>

            </Box>
        </Flex>
    </Box>
  )
}

export default CardControle