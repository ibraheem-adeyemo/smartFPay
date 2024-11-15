import { Box } from '@chakra-ui/react'
import React from 'react'
import { ReusableTable } from '../reusables/ReusableTable';
import { SearchAndFilter } from '../reusables/SearchAndFilter';

const CustomerInfoTable = () => {
  return (
    <Box>
        {/* <SearchAndFilter /> */}
        <ReusableTable />
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
