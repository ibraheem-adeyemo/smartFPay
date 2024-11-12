import { Box, Heading, Input, Radio, RadioGroup, Text } from '@chakra-ui/react'
import React, { useContext, useRef, useState} from 'react'
import ReusableForm from '../reusables/ReusableForm';
import PaymentControlProviders, { PaymentControlContext } from '../../providers/PaymentControlProviders';
import { usePaymentControl } from '../../hooks/paymentControlHooks';
import { accountControlFields, timeLimitFields } from '../forms/limitControlFormFeilds';
import { validationSchema } from '../forms/formValidation';
import { EditCardControl } from './EditCardControl';

const accountInitialValues = {
    transactionLimitAmount:'5000',
    selectedPeriod:'Monthly'
}

const timeInitialValues = {
    transactionLimitAmount:'24 Aug 2022',
    selectedPeriod:'29 Aug 2024'
}

  const TimeLimitControlForm = () => {
    const { handleControlSubmit, submitFormRef } = useContext(PaymentControlContext)
    return (
        <Box>
            <ReusableForm
                initialValues={timeInitialValues}
                handleSubmit={(obj)=>handleControlSubmit(obj)}
                fields={timeLimitFields}
                validationSchema={validationSchema}
                submitFormRef={submitFormRef}
                shouldHaveSubmitBtn={false} />
        </Box>
    )
  }

const AcccountControlForm = () => {
    const { handleControlSubmit, submitFormRef } = useContext(PaymentControlContext)


  return (
    <Box>
        {/* <Heading size='md' mb='20px'>Create Account Control</Heading> */}
        <ReusableForm
            initialValues={accountInitialValues}
            handleSubmit={(obj)=>handleControlSubmit(obj)}
            fields={accountControlFields}
            validationSchema={validationSchema}
            submitFormRef={submitFormRef}
            shouldHaveSubmitBtn={false} />
    </Box>
  )
}

export const EditAcccountControl = () => { 
    const { switchControl, limit} = useContext(PaymentControlContext)

    const transactionLimit = 'transactionLimit'
    const timeLimit = 'timeLimit'

    const LimitControl = () => {
        switch (limit) {
            case transactionLimit :
                return (
                    <AcccountControlForm />
                )
            case timeLimit:
                return <TimeLimitControlForm />        
            default:
                <></>;
        }
    }

    return(
            <EditCardControl>
                <Heading size='md'>Create Account Control</Heading>
                <Box my='15px'>
                    <Text mb='7px'>Please Select</Text>
                    <RadioGroup>
                        <Radio value={transactionLimit} onChange={(e)=>switchControl(e.target.value)} mr='20px'>Transaction Limit</Radio>
                        <Radio value={timeLimit} onChange={(e)=>switchControl(e.target.value)}>Time Limit</Radio>
                    </RadioGroup>
                </Box>
                <LimitControl />
            </EditCardControl>
        )
}

export const EditAcccountControlPage = () => {
    return(
        <PaymentControlProviders>
            <EditAcccountControl />
        </PaymentControlProviders>
    )
}
