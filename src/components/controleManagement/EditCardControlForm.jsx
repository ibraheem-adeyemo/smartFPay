import React, {useContext } from 'react'
import { Box, Input, Heading, Radio, RadioGroup, Text } from '@chakra-ui/react'
import PaymentControlProviders, { PaymentControlContext } from '../../providers/PaymentControlProviders'
import ReusableForm from '../reusables/ReusableForm'
import * as Yup from 'yup'
import CardControle from './CardControle'
import { cardAccountfields, countLimitFields } from '../forms/limitControlFormFeilds'
import { cardAccountvalidationSchema, countValidationSchema } from '../forms/formValidation'

const initialValues = {
    transactionLimitAmount:'40000',
    selectedPeriod:'Monthly',
    enabledCountries:'Nigeria',
    enabledCountries:'POS',
    startDate:new Date('2024-06-9'),
    endDate:new Date('2022-06-9')
}

const initialCountValues = {
    countLimit:'30000',
    selectedPeriod:'Weekly',
    enabledCountries:'Nigeria',
    enabledCountries:'USSD',
    startDate:new Date('2024-06-9'),
    endDate:new Date('2022-06-9')
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

    const transactionLimit = 'transactionLimit'
    const countLimit = 'countLimit'

    const LimitControl = () => {
        switch (limit) {
            case transactionLimit:
                return (
                    <CreateCardControlForm />
                )
            case countLimit:
                return <CreateCountLimiControlForm />        
            default:
                return <></>;
        }
    }

    return (
        <EditCardControlPage>
                <Heading size='md'>Create Card Control</Heading>
                <Box my='15px'>
                    <Text mb='7px'>Please Select</Text>
                    <RadioGroup>
                        <Radio value={transactionLimit} onChange={(e)=>switchControl(e.target.value)} mr='20px'>Transaction Limit</Radio>
                        <Radio value={countLimit} onChange={(e)=>switchControl(e.target.value)}>Time Limit</Radio>
                    </RadioGroup>
                </Box>
                <LimitControl />
            </EditCardControlPage>
    )
}

export const EditCardControlPage = () => {
    return (
        <PaymentControlProviders>
            <CreateCardControl />
        </PaymentControlProviders>
    )
}
