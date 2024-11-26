import React, { createContext } from 'react'
import { userCustometInfo } from '../hooks/customerInformationHooks';

export const CustomerInformationContext = createContext();



export const CustomerInformationProviders = ({children}) => {
  return (
    <CustomerInformationContext.Provider value={userCustometInfo()}>
        {children}
    </CustomerInformationContext.Provider>
  )
}
