import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { ButtonComponent } from '../reusables/ButtonComponent'
import { Link } from 'react-router-dom'
import { pageLinks } from '../../constants/pageLinks'
import { usePaymentControl } from '../../hooks/paymentControlHooks'
import { PaymentControlContext } from '../../providers/PaymentControlProviders'
import CardDetails from './card-details/CardDetails'
import { useDispatch, useSelector } from 'react-redux'
import { resetQueriedUsers } from '../../store/features/userSlice'

export const EditCardControl = ({children}) => {
    const location = useLocation()
    const locationArr = location.pathname.split('/')
    const { queriedUser } = useSelector(state => state.userReducer)
    
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const visitUrl = locationArr[locationArr.length - 1]
    const { btnIsDisabled, handleControlSubmit } = useContext(PaymentControlContext)

    const cardHolderName = queriedUser?.virtualCardDetails?.cardNumber


    const handleBack = () => {
        navigate(-1); // Should work if there's history
      };

    useEffect(() => {
      if(visitUrl == pageLinks.userAccount) {
        dispatch(resetQueriedUsers())
      }
    }, [visitUrl])
    
    useEffect(() => {
        if(cardHolderName === !(''|| undefined)) {
          navigate(`${pageLinks.controlManagement}/${pageLinks.customerAccountForm}`)
        }
      }, [cardHolderName])

    const submitBtnURLArray = [pageLinks.editAccountControl, pageLinks.editCardControl]

    // edit-customer-account
  return (
    <Box>
        <Flex mb='32px' alignItems='center' justifyContent='space-between'>
            <Button onClick={handleBack}  _hover={{bgColor:'none'}}>
                <Box _hover={{bgColor:'muted-blue'}} bgColor='primary-blue' p='7px' borderRadius='50%' mr='20px'>
                    <FaArrowLeft fontSize='23px' color='white' />
                </Box>
                <Heading>Back</Heading>
            </Button>
            {
                visitUrl == pageLinks.editCustomerAccount && <React.Fragment>
                    <Flex width='700px' justifyContent='space-evenly'>
                        <ButtonComponent as={Link} to={`${pageLinks.controlManagement}/${pageLinks.editCardControl}`} btnText='Edit Card Control' variant='outline' />
                        <ButtonComponent as={Link} to={`${pageLinks.controlManagement}/${pageLinks.editAccountControl}`} btnText='Edit Account Control' />
                    </Flex>
                </React.Fragment> 
            }
            {
                
               submitBtnURLArray.includes(visitUrl) && <Flex> <ButtonComponent btnText='Save Changes' isDisabled={btnIsDisabled} onClick={handleControlSubmit}  /> </Flex>
            }
        </Flex>
        <Flex gap="32px">
            <Box width='700px' border="1px solid" borderColor="main_light_gray" bgColor='white' borderRadius='8px' p='24px' minH='400px'>
                {children}
            </Box>
            <Box width='670px' border="1px solid" borderColor="main_light_gray" height='30rem' bgColor='white' borderRadius='8px' p='24px'>
                <Box mb='50px'>
                    <Heading size='md'>Card Details</Heading>
                </Box>
                <CardDetails />
            </Box>
        </Flex>
    </Box>
  )
}
