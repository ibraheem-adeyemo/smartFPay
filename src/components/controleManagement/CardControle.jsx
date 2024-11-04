import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { ButtonComponent } from '../reusables/ButtonComponent'
import { Link } from 'react-router-dom'
import { pageLinks } from '../../constants/pageLinks'

const CardControle = ({children}) => {
    const location = useLocation()
    const locationArr = location.pathname.split('/')
    console.log(locationArr[locationArr.length - 1] == 'customer-account-form', locationArr[locationArr.length - 1])
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1); // Should work if there's history
      };

  return (
    <Box>
        <Flex mb='32px' alignItems='center' justifyContent='space-between'>
            <Button onClick={handleBack} bgColor='white'  _hover={{bgColor:'white'}}>
                <Box _hover={{bgColor:'muted-blue'}} bgColor='primary-blue' p='7px' borderRadius='50%' mr='20px'>
                    <FaArrowLeft fontSize='23px' color='white' />
                </Box>
                <Heading>Back</Heading>
            </Button>
            {
                locationArr[locationArr.length - 1] == 'customer-account-form' && <React.Fragment>
                    <Flex width='700px' justifyContent='space-evenly'>
                        <ButtonComponent as={Link} to={`${pageLinks.controleManagement}/${pageLinks.createCardControl}`} btnText='Create Card Control' variant='outline' />
                        <ButtonComponent as={Link} to={`${pageLinks.controleManagement}/${pageLinks.createAccountControl}`} btnText='Create Account Control' />
                    </Flex>
                </React.Fragment> 
            }
            {
                locationArr[locationArr.length - 1] == 'create-account' && <Flex> <ButtonComponent btnText='Submit' /> </Flex>
            }
        </Flex>
        <Flex gap="32px">
            <Box width='624px' border="1px solid" borderColor="main_light_gray" borderRadius='8px' p='24px' minH='400px'>
                {children}
            </Box>
            <Box width='469px'>

            </Box>
        </Flex>
    </Box>
  )
}

export default CardControle