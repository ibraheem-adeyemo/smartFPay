import React, {useContext} from 'react';
import * as Yup from 'yup';
import ReusableForm from '../reusables/ReusableForm';
import { Box, Heading } from '@chakra-ui/react';
import CardControl from './CardControl';
import PaymentControlProviders from '../../providers/PaymentControlProviders';
import { PaymentControlContext } from '../../providers/PaymentControlProviders';

// Initial form values
const initialValues = {
    customerAccountNumber: '007897354154',
    customerAccountName: 'Omodayo Omofunke',
    coreBankingId: '0012AB4',
    currencyCode: 'NGN',
};

// Validation schema using Yup
const validationSchema = Yup.object({
    customerAccountNumber: Yup.number().required('customerAccountNumber is required'),
    customerAccountName: Yup.string().required('customerAccountName is required'),
  message: Yup.string().required('Message is required'),
});

// Form fields configuration
const fields = [
  { label: 'Customer Account Number', name: 'customerAccountNumber', type: 'number', bgColor:'#e3e6e8', color:'#1f1f20', disabled: true },
  { label: 'Customer Account Name', name: 'customerAccountName', type: 'text' },
  { label: 'Core Banking ID', name: 'coreBankingId', type: 'text' },
  { label: 'Currency Code', name: 'currencyCode', type: 'text' },
];

// Submit handler
const handleSubmit = (values, actions) => {
  actions.setSubmitting(false);
};

const CustomerAccountForm = () => {
    const { handleControlSubmit, submitFormRef } = useContext(PaymentControlContext)

  return (<Box>
    <Heading mb='20px' size='md' fontSize='20px' fontFamily={''}>Customer account form</Heading>
    <ReusableForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleControlSubmit}
      submitFormRef={submitFormRef}
      fields={fields}
      shouldHaveSubmitBtn={false}
    />
  </Box>)
}

export const CustomerAccountFormPage = () => {
    return(
        <PaymentControlProviders>
            <CardControl>
                <CustomerAccountForm />
            </CardControl>
        </PaymentControlProviders>
    )
}