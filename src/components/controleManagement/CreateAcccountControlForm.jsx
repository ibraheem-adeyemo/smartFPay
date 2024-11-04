import { Box, Heading, Radio, RadioGroup, Text } from '@chakra-ui/react'
import React, { useState} from 'react'
import ReusableForm from '../reusables/ReusableForm';
import * as Yup from 'yup';
import CardControle from './CardControle';

const initialValues = {
    transactionLimitAmount:'',
    selectedPeriod:''
}

const validationSchema = Yup.object({
    transactionLimitAmount: Yup.number().required('customerAccountNumber is required'),
    selectedPeriod: Yup.string().required('selectedPeriod is required'),
});

const fields = [
    { label: 'Transaction Limit Amount', name: 'transactionLimitAmount', type: 'number', placeHolder:'Enter amount' },
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
    {label: 'Start Date', name: 'startDate', component: 'datePicker', placeHolder:'Please Select'},
    {label: 'End Date', name: 'endDate', component: 'datePicker', placeHolder:'Please Select'},
  ]

  const TimeLimitControlForm = () => {
    return (
        <Box>
            <ReusableForm
                initialValues={initialValues}
                fields={timeLiimiFields}
                validationSchema={validationSchema}
                shouldHaveSubmitBtn={false} />
        </Box>
    )
  }

const CreateAcccountControlForm = () => {
    
  return (
    <Box>
        {/* <Heading size='md' mb='20px'>Create Account Control</Heading> */}
        <ReusableForm
            initialValues={initialValues}
            fields={fields}
            validationSchema={validationSchema}
            shouldHaveSubmitBtn={false} />
    </Box>
  )
}

export const CreateAcccountControlPage = () => {
    const [limit, setLimit] = useState('')


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
                    <Radio value='transactionLimit' onChange={(e) => setLimit(e.target.value)} mr='20px'>Transaction Limit</Radio>
                    <Radio value='timeLimit' onChange={(e) => setLimit(e.target.value)}>Time Limit</Radio>
                </RadioGroup>
            </Box>
            <LimitControl />
        </CardControle>
    )
}