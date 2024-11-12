import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { ButtonComponent } from '../reusables/ButtonComponent'
import { Link } from 'react-router-dom'
import { pageLinks } from '../../constants/pageLinks'
import { usePaymentControl } from '../../hooks/paymentControlHooks'
import { PaymentControlContext } from '../../providers/PaymentControlProviders'
import CardDetails from './card-details/CardDetails'
import { useDispatch, useSelector } from 'react-redux'
import { resetQueriedUsers, clearErrorMsg } from '../../store/features/userSlice'
import { useToast } from '@chakra-ui/react'
import BackButton from '../reusables/BackButton'

const CardControl = ({children}) => {
    const location = useLocation()
    const toast = useToast()

    const locationArr = location.pathname.split('/')
    const { queriedUser, errorMsg } = useSelector(state => state.userReducer)
    
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if(errorMsg) {
            toast({
                status: 'error',
                title:errorMsg,
                isClosable:true,
                onCloseComplete: ()=> dispatch(clearErrorMsg())
            })
        }
    }, [errorMsg])
    

    const visitUrl = locationArr[locationArr.length - 1]
    const { btnIsDisabled, handleControlSubmit } = useContext(PaymentControlContext)

    const cardHolderName = queriedUser?.virtualCardDetails?.cardNumber

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

    const submitBtnURLArray = [pageLinks.createAccountControl, pageLinks.createCardControl]


  return (
    <Box>
        <Flex mb='32px' alignItems='center' justifyContent='space-between'>
            <BackButton />
            {
                visitUrl == 'customer-account-form' && <React.Fragment>
                    <Flex width='700px' justifyContent='space-evenly'>
                        <ButtonComponent as={Link} to={`${pageLinks.controlManagement}/${pageLinks.createCardControl}`} btnText='Create Card Control' variant='outline' />
                        <ButtonComponent as={Link} to={`${pageLinks.controlManagement}/${pageLinks.createAccountControl}`} btnText='Create Account Control' />
                    </Flex>
                </React.Fragment> 
            }
            {
               submitBtnURLArray.includes(visitUrl) && <Flex> <ButtonComponent btnText='Submit' isDisabled={btnIsDisabled} onClick={handleControlSubmit}  /> </Flex>
            }
        </Flex>
        <Flex gap="32px">
            <Box width='700px' border="1px solid" borderColor="main_light_gray" bgColor='white' borderRadius='8px' p='24px' minH='400px'>
                {children}
            </Box>
            <Box width='670px' border="1px solid" borderColor="main_light_gray" bgColor='white' borderRadius='8px' p='24px'>
                <Box mb='50px'>
                    <Heading size='md'>Card Details</Heading>
                </Box>
                <CardDetails />
            </Box>
        </Flex>
    </Box>
  )
}

export default CardControl