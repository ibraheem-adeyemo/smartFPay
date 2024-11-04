import { Box, Heading, Input, Radio, RadioGroup, Text } from '@chakra-ui/react'
import React, { useContext, useRef, useState} from 'react'
import ReusableForm from '../reusables/ReusableForm';
import * as Yup from 'yup';
import CardControle from './CardControle';
import PaymentControlProviders, { PaymentControlContext } from '../../providers/PaymentControlProviders';
import { usePaymentControl } from '../../hooks/paymentControlHooks';

const initialValues = {
    transactionLimitAmount:'',
    selectedPeriod:''
}

const validationSchema = Yup.object({
    transactionLimitAmount: Yup.number().required('customerAccountNumber is required'),
    selectedPeriod: Yup.string().required('selectedPeriod is required'),
});

const fields = [
    { label: 'Transaction Limit Amount', name: 'transactionLimitAmount', type: 'number', placeholder:'Enter amount', component:Input },
    { label: 'Select Period', name: 'selectedPeriod', component: 'select',
        options: [
            { value: 'Daily', label: 'Daily' },
            { value: 'Weekly', label: 'Weekly' },
            { value: 'Monthly', label: 'Monthly' },
        ] ,
    },
    {label: 'Interbank Transaction', name: 'interbankTransaction', component: 'radioGroup', defaultValue:'yes', bgColor: 'none',
        options: [
            {label: 'yes', value: 'yes'},
            {label: 'no', value: 'no'},
        ]
    }
  ];

  const timeLiimiFields = [
    {label: 'Start Date', name: 'startDate', component: 'datePicker', placeholder:'Please Select'},
    {label: 'End Date', name: 'endDate', component: 'datePicker', placeholder:'Please Select'},
  ]

  const TimeLimitControlForm = () => {
    const { handleControlSubmit, submitFormRef } = useContext(PaymentControlContext)
    return (
        <Box>
            <ReusableForm
                initialValues={initialValues}
                handleSubmit={(obj)=>handleControlSubmit(obj)}
                fields={timeLiimiFields}
                validationSchema={validationSchema}
                submitFormRef={submitFormRef}
                shouldHaveSubmitBtn={false} />
        </Box>
    )
  }

const CreateAcccountControlForm = () => {
    const { handleControlSubmit, submitFormRef } = useContext(PaymentControlContext)

  return (
    <Box>
        {/* <Heading size='md' mb='20px'>Create Account Control</Heading> */}
        <ReusableForm
            initialValues={initialValues}
            handleSubmit={(obj)=>handleControlSubmit(obj)}
            fields={fields}
            validationSchema={validationSchema}
            submitFormRef={submitFormRef}
            shouldHaveSubmitBtn={false} />
    </Box>
  )
}

export const CreateAcccountControl = () => {  

    const { switchControl, limit} = useContext(PaymentControlContext)


    const LimitControl = () => {
        switch (limit) {
            case 'transactionLimit':
                return (
                    <CreateAcccountControlForm />
                )
            case 'timeLimit':
                return <TimeLimitControlForm />        
            default:
                <></>;
        }
    }

    return(
            <CardControle>
                <Heading size='md'>Create Account Control</Heading>
                <Box my='15px'>
                    <Text mb='7px'>Please Select</Text>
                    <RadioGroup>
                        <Radio value='transactionLimit' onChange={(e)=>switchControl(e.target.value)} mr='20px'>Transaction Limit</Radio>
                        <Radio value='timeLimit' onChange={(e)=>switchControl(e.target.value)}>Time Limit</Radio>
                    </RadioGroup>
                </Box>
                <LimitControl />
            </CardControle>
        )
}

export const CreateAcccountControlPage = () => {
    return(
        <PaymentControlProviders>
            <CreateAcccountControl />
        </PaymentControlProviders>
    )
}