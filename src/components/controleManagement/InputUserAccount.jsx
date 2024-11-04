import { Box, FormControl, FormLabel, Heading, Flex, Input, Text, VStack, HStack } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup';
import CardControle from './CardControle';
import { useHref, useNavigate } from 'react-router-dom';
import { pageLinks } from '../../constants/pageLinks';

const InputUserAccount = () => {

    const navigate = useNavigate();

    const validationSchema = yup.object({
        accountNumber: yup.number().required('Kindly input correct account number')
    })
    const onSubmit = (values) => {
        console.log(values)
    }

    const initialValue = {
        accountNumber: '',
                // fullName: '': '',
    }
    const handleClick = () => {
        navigate(`${pageLinks.controleManagement}/${pageLinks.customerAccountForm}`)
    }
  return (
    <Flex flexDir='column' pt='20px' >
        <Heading size='md' >Customer Account Form</Heading>
        <Box pt='20px'>
            <Heading size='xs' mb='10px' color='primary-text'>Customer account number</Heading>
            <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValue}>
                <Form>
                    <FormControl> 
                        <Input name="accountNumber" type='number' placeholder="Enter account number" onClick={handleClick} backgroundColor='main_light_gray' height='48px' />
                        {/* <Field name="Full name" type='text' placeholder="Enter full name" /> */}
                    </FormControl>
                </Form>
            </Formik>
        </Box>
    </Flex>
  )
}

export const InputUserAccountPage = () => {
    

    return(
        <CardControle>
            <InputUserAccount  />
        </CardControle>
    )
}