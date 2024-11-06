import React, {useContext } from 'react'
import { Box, Input, Heading, Radio, RadioGroup, Text } from '@chakra-ui/react'
import PaymentControlProviders, { PaymentControlContext } from '../../providers/PaymentControlProviders'
import ReusableForm from '../reusables/ReusableForm'
import * as Yup from 'yup'
import CardControle from './CardControle'

const initialValues = {
    transactionLimitAmount:'',
    selectedPeriod:'',
    enabledCountries:'',
    enabledCountries:'',
    startDate:'',
    endDate:''
}

const initialCountValues = {
    countLimit:'',
    selectedPeriod:'',
    enabledCountries:'',
    enabledCountries:'',
    startDate:'',
    endDate:''
}

const validationSchema = Yup.object({
    transactionLimitAmount: Yup.number().required('Customer account number is required'),
    selectedPeriod: Yup.string().required('Selected period is required'),
    enabledCountries: Yup.string().required('Enabled country is required'),
    enabledCountries: Yup.string().required('Enabled channel is required'),
});

const countValidationSchema = Yup.object({
    countLimit: Yup.number().required('Customer account number is required'),
    selectedPeriod: Yup.string().required('Selected period is required'),
    enabledCountries: Yup.string().required('Enabled country is required'),
    enabledCountries: Yup.string().required('Enabled channel is required'),
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
    {label: 'Start Date', name: 'startDate', component: 'datePicker', placeholder:'Please Select'},
    {label: 'End Date', name: 'endDate', component: 'datePicker', placeholder:'Please Select'},
    {label: 'Enabled Channels', name: 'enabledChannels', component: 'select', options: [
        {value:"ATM", label: 'ATM'},
        {value:"POS", label: 'POS'},
        {value:"WEB", label: "WEB"},
        {value:"USSD", USSD: "USSD"}
    ]},
    {label: 'Enabled Countries', name: 'enabledCountries', component: 'select', options: [
        {value:"Ghana", label: 'Ghana'},
        {value:"Kenya", label: 'Kenya'},
        {value:"Mozanbique", label: "Mozanbique"},
        {value:"Nigeria", USSD: "Nigeria"},
        {value:"Uruguay", USSD: "Uruguay"}
    ]},
    {label: 'Card Status', name: 'cardStatus', component: 'radioGroup', defaultValue:'active', bgColor: 'none',
        options: [
            {label: 'Active', value: 'active'},
            {label: 'Blocked', value: 'blocked'},
        ]
    }
]

const countLimitFields = [
    { label: 'Count Limit ', name: 'countLimit', type: 'number', placeholder:'Enter amount', component:Input },
    { label: 'Select Period', name: 'selectedPeriod', component: 'select',
        options: [
            { value: 'Daily', label: 'Daily' },
            { value: 'Weekly', label: 'Weekly' },
            { value: 'Monthly', label: 'Monthly' },
        ] ,
    },
    {label: 'Start Date', name: 'startDate', component: 'datePicker', placeholder:'Please Select'},
    {label: 'End Date', name: 'endDate', component: 'datePicker', placeholder:'Please Select'},
    {label: 'Enabled Channels', name: 'enabledChannels', component: 'select', options: [
        {value:"ATM", label: 'ATM'},
        {value:"POS", label: 'POS'},
        {value:"WEB", label: "WEB"},
        {value:"USSD", USSD: "USSD"}
    ]},
    {label: 'Enabled Countries', name: 'enabledCountries', component: 'select', options: [
        {value:"Ghana", label: 'Ghana'},
        {value:"Kenya", label: 'Kenya'},
        {value:"Mozanbique", label: "Mozanbique"},
        {value:"Nigeria", USSD: "Nigeria"},
        {value:"Uruguay", USSD: "Uruguay"}
    ]},
    {label: 'Card Status', name: 'cardStatus', component: 'radioGroup', defaultValue:'active', bgColor: 'none',
        options: [
            {label: 'Active', value: 'active'},
            {label: 'Blocked', value: 'blocked'},
        ]
    }
]

const CreateCardControlForm = () => {
    const { handleControlSubmit, submitFormRef } = useContext(PaymentControlContext)
    return (
        <Box>
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

const CreateCountLimiControlForm = () => {
    const { handleControlSubmit, submitFormRef } = useContext(PaymentControlContext)
    return (
        <Box>
            <ReusableForm
                initialValues={initialCountValues}
                handleSubmit={(obj)=>handleControlSubmit(obj)}
                fields={countLimitFields}
                validationSchema={countValidationSchema}
                submitFormRef={submitFormRef}
                shouldHaveSubmitBtn={false} />
        </Box>
    )
}

const CreateCardControl = () => {

    const { switchControl, limit } = useContext(PaymentControlContext)


    const LimitControl = () => {
        switch (limit) {
            case 'transactionLimit':
                return (
                    <CreateCardControlForm />
                )
            case 'countLimit':
                return <CreateCountLimiControlForm />        
            default:
                return <></>;
        }
    }

    return (
        <CardControle>
                <Heading size='md'>Create Card Control</Heading>
                <Box my='15px'>
                    <Text mb='7px'>Please Select</Text>
                    <RadioGroup>
                        <Radio value='transactionLimit' onChange={(e)=>switchControl(e.target.value)} mr='20px'>Transaction Limit</Radio>
                        <Radio value='countLimit' onChange={(e)=>switchControl(e.target.value)}>Time Limit</Radio>
                    </RadioGroup>
                </Box>
                <LimitControl />
            </CardControle>
    )
}

export const CreateCardControlPage = () => {
    return (
        <PaymentControlProviders>
            <CreateCardControl />
        </PaymentControlProviders>
    )
}