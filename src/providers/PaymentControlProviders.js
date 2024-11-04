import React, { useState, useContext, createContext, Children} from 'react';
import { usePaymentControl } from '../hooks/paymentControlHooks';

export const PaymentControlContext = createContext();

const PaymentControlProviders = ({children}) => {
    // const [submitBtnShouldActive, setSubmitBtnShouldActive] = useState(false)

  return (
    <PaymentControlContext.Provider value={usePaymentControl()}>
      {children}
    </PaymentControlContext.Provider>
  )
}

export default PaymentControlProviders