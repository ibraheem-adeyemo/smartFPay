import { Box } from '@chakra-ui/react'
import React from 'react'
import { ReusableTable } from '../reusables/ReusableTable';
import { SearchAndFilter } from '../reusables/SearchAndFilter';
import { TableTopComponent } from '../reusables/TableTopComponent';
import { pageLinks } from '../../constants/pageLinks';

const CustomerInfoTable = () => {
  return (
    <Box>
        <SearchAndFilter />
        <Box border='1px solid' borderRadius='8px' bgColor='white' borderColor='main_light_gray'>
            <TableTopComponent tableTopTitle='Customers' tableTopText='See a directory of all customers created.' btnText='Create Customer' linkTo={pageLinks.createCustomer} />
            <ReusableTable />
        </Box>
    </Box>
  )
}

export const CustomerInfo = () => {
    return (
        <Box>
            <CustomerInfoTable />
        </Box>
    )
}
