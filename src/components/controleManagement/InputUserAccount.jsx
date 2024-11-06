import { Box, FormControl, FormLabel, Heading, Flex, Input, Button, Text, VStack, HStack } from '@chakra-ui/react'
import { Field, Form, Formik, useFormikContext } from 'formik'
import React, { useEffect} from 'react'
import * as yup from 'yup';
import CardControle from './CardControle';
import { useHref, useNavigate } from 'react-router-dom';
import { pageLinks } from '../../constants/pageLinks';
import PaymentControlProviders from '../../providers/PaymentControlProviders';
import { FaSearch } from 'react-icons/fa';
import { searchUserAccount } from '../../store/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const InputUserAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { queriedUser } = useSelector(state => state.userReducer)
    const validationSchema = yup.object({
        accountNumber: yup.number().required('Kindly input correct account number')
    })

    const cardHolderName = queriedUser.virtualCardDetails.cardNumber

    const onSubmit = (values, {resetForm}) => {
        dispatch(searchUserAccount(values))
        resetForm()
    }

    const initialValue = {
        accountNumber: '',
                // fullName: '': '',
    }
    const handleClick = () => {
        // navigate(`${pageLinks.controleManagement}/${pageLinks.customerAccountForm}`)
    }

    useEffect(() => {
      if(cardHolderName) {
        navigate(`${pageLinks.controleManagement}/${pageLinks.customerAccountForm}`)
      }
    }, [cardHolderName])
    

    if(queriedUser.cardHolderName) {
        navigate(`${pageLinks.controleManagement}/${pageLinks.customerAccountForm}`)
    }
    const HandleSubmit = ({submitRef}) => {
        const {submitform, values} = useFormikContext();

        useEffect(() => {
          submitRef.current = {submitform, values}
        }, [submitform, values, submitRef])
        
        return null
    }
    
  return (
    <Flex flexDir='column' >
        <Heading size='md' >Customer Account Form</Heading>
        <Box pt='20px'>
            <Heading size='xs' mb='10px' color='primary-text'>Customer account number</Heading>
            <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValue}>
                <Form>
                    <Flex bgColor='main_light_gray' borderRadius='8px' >
                    <FormControl> 
                        {/* <Input name="accountNumber" type='number' placeholder="Enter account number" onClick={handleClick} backgroundColor='main_light_gray' height='48px' /> */}
                        <Field name="accountNumber" as={Input} type='number' placeholder="Enter account number" backgroundColor='main_light_gray' height='48px' />
                    </FormControl>
                    <Button height='50px' type='submit' color='grey' bgColor='main_light_gray' borderLeftRadius={'0px'}>
                        <FaSearch />
                    </Button>
                    </Flex>
                </Form>
            </Formik>
        </Box>
    </Flex>
  )
}

export const InputUserAccountPage = () => {
    

    return(
        <PaymentControlProviders>
            <CardControle>
                <InputUserAccount  />
            </CardControle>
        </PaymentControlProviders>
    )
}