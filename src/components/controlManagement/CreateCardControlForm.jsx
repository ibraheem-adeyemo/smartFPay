import React, {useContext } from 'react'
import { Box, Input, Heading, Radio, RadioGroup, Text } from '@chakra-ui/react'
import PaymentControlProviders, { PaymentControlContext } from '../../providers/PaymentControlProviders'
import ReusableForm from '../reusables/ReusableForm'
import CardControl from './CardControl'
import { cardAccountfields, countLimitFields } from '../forms/limitControlFormFeilds'
import { cardAccountvalidationSchema, countValidationSchema } from '../forms/formValidation'

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

const CreateCardControlForm = () => {
    const { handleControlSubmit, submitFormRef } = useContext(PaymentControlContext)
    return (
        <Box>
            <ReusableForm
                initialValues={initialValues}
                handleSubmit={(obj)=>handleControlSubmit(obj)}
                fields={cardAccountfields}
                validationSchema={cardAccountvalidationSchema}
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
        <CardControl>
                <Heading size='md'>Create Card Control</Heading>
                <Box my='15px'>
                    <Text mb='7px'>Please Select</Text>
                    <RadioGroup>
                        <Radio value='transactionLimit' onChange={(e)=>switchControl(e.target.value)} mr='20px'>Transaction Limit Amount</Radio>
                        <Radio value='countLimit' onChange={(e)=>switchControl(e.target.value)}>Time Limit</Radio>
                    </RadioGroup>
                </Box>
                <LimitControl />
            </CardControl>
    )
}

export const CreateCardControlPage = () => {
    return (
        <PaymentControlProviders>
            <CreateCardControl />
        </PaymentControlProviders>
    )
}