import { Box, Heading, Input, Radio, RadioGroup, Text } from '@chakra-ui/react'
import React, { useContext, useRef, useState} from 'react'
import ReusableForm from '../reusables/ReusableForm';
import * as Yup from 'yup';
import CardControl from './CardControl';
import PaymentControlProviders, { PaymentControlContext } from '../../providers/PaymentControlProviders';
import { usePaymentControl } from '../../hooks/paymentControlHooks';
import { accountControlFields, timeLimitFields } from '../forms/limitControlFormFeilds';
import { validationSchema } from '../forms/formValidation';

const initialValues = {
    transactionLimitAmount:'',
    selectedPeriod:''
}


  const TimeLimitControlForm = () => {
    const { handleControlSubmit, submitFormRef } = useContext(PaymentControlContext)
    return (
        <Box>
            <ReusableForm
                initialValues={initialValues}
                handleSubmit={(obj)=>handleControlSubmit(obj)}
                fields={timeLimitFields}
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
            fields={accountControlFields}
            validationSchema={validationSchema}
            submitFormRef={submitFormRef}
            shouldHaveSubmitBtn={false} />
    </Box>
  )
}

export const CreateAcccountControl = () => { 
    const { switchControl, transactionLimit, timeLimit, limit} = useContext(PaymentControlContext)

    console.log(limit, transactionLimit, timeLimit)
    const LimitControl = () => {
        switch (limit) {
            case 'transactionLimit': //transactionLimit :
                return (
                    <CreateAcccountControlForm />
                )
            case 'timeLimit': //timeLimit:
                return <TimeLimitControlForm />        
            default:
                <></>;
        }
    }

    return(
            <CardControl>
                <Heading size='md'>Create Account Control</Heading>
                <Box my='15px'>
                    <Text mb='7px'>Please Select</Text>
                    <RadioGroup>
                        <Radio value='transactionLimit' onChange={(e)=>switchControl(e.target.value)} mr='20px'>Transaction Limit</Radio>
                        <Radio value={'timeLimit'} onChange={(e)=>switchControl(e.target.value)}>Time Limit</Radio>
                    </RadioGroup>
                </Box>
                <LimitControl />
            </CardControl>
        )
}

export const CreateAcccountControlPage = () => {
    return(
        <PaymentControlProviders>
            <CreateAcccountControl />
        </PaymentControlProviders>
    )
}