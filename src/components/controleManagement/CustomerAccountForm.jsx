import React from 'react';
import * as Yup from 'yup';
import ReusableForm from '../reusables/ReusableForm';
import { Box, Heading } from '@chakra-ui/react';
import CardControle from './CardControle';

// Initial form values
const initialValues = {
    customerAccountNumber: '0078973541',
    customerAccountName: 'Omodayo Omofunke',
    coreBankingId: '0012AB4',
    currencyCode: 'USD',
};

// Validation schema using Yup
const validationSchema = Yup.object({
    customerAccountNumber: Yup.number().required('customerAccountNumber is required'),
    customerAccountName: Yup.string().required('customerAccountName is required'),
  message: Yup.string().required('Message is required'),
});

// Form fields configuration
const fields = [
  { label: 'Customer Account Number', name: 'customerAccountNumber', type: 'number' },
  { label: 'Customer Account Name', name: 'customerAccountName', type: 'text' },
  { label: 'Core Banking ID', name: 'coreBankingId', type: 'text' },
  { label: 'Currency Code', name: 'currencyCode', type: 'text' },
];

// Submit handler
const handleSubmit = (values, actions) => {
  console.log(values);
  actions.setSubmitting(false);
};

const CustomerAccountForm = () => (
  <Box>
    <Heading my='20px'>Customer account form</Heading>
    <ReusableForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      fields={fields}
      shouldHaveSubmitBtn={false}
    />
  </Box>
);

export const CustomerAccountFormPage = () => {
    return(
        <CardControle>
            <CustomerAccountForm />
        </CardControle>
    )
}