import React, { useContext } from 'react'
import ReusableForm from '../reusables/ReusableForm'
import { CustomerInformationContext, CustomerInformationProviders } from '../../providers/CustomerInformationProviders'
import { customerInfoFormFeild } from '../forms/customerInformationFormFeilds'
import { createCustomerFormValidationSchema } from '../forms/formValidation'
import { Box, Heading, Flex } from '@chakra-ui/react'
import BackButton from '../reusables/BackButton'
import {ButtonComponent} from '../reusables/ButtonComponent';

const initialValues = {
    accountNumber:1356780324,
    coreBankingId:5564307,
    customerName: 'James Akinwale',
    enabledPaymentChannels: ['ATM','USSD', 'POS'],
    subscriptionStatus: 'subscribed'
}
const CreateCustomerForm = () => {
    const { handleCreateCustomerFormSubmit, submitFormRef } = useContext(CustomerInformationContext)
    return (
        <ReusableForm
        initialValues={initialValues}
        onsubmit={handleCreateCustomerFormSubmit}
        fields={customerInfoFormFeild}
        validationSchema={createCustomerFormValidationSchema}
        submitFormRef={submitFormRef}
        shouldHaveSubmitBtn={false}
             />
    )
}

const CreatCustomerComponent = () => {
    const { handleCreateCustomerFormSubmit } = useContext(CustomerInformationContext)

    return (
        <>
            <Flex justifyContent='space-between' mb='2rem'>
            <BackButton />
            <ButtonComponent btnText='Create Customer' onClick={handleCreateCustomerFormSubmit} />
            </Flex>
            <Box width={'50%'} px='2rem' py='1.4rem' borderRadius='lg' border='1px solid' borderColor='main_light_gray' bgColor='white'>
                <Heading fontSize='1.4rem' mb='1rem'>Create Customer</Heading>
                <CreateCustomerForm />
            </Box>
        </>
    )
}

export const EditCustomer = () => {
  return (
    <CustomerInformationProviders>
        <CreatCustomerComponent />
    </CustomerInformationProviders>
  )
}
 
