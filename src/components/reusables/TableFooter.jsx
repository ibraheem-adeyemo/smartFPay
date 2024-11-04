import { Flex, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { ReusableDropdown } from './Dropdown';

const TableFooter = (props) => {
    const { canPreviousPage, canNextPage, pageIndex, pageOptions, nextPage, previousPage, tableData } = props;

    const [tableRows, setTableRows] = useState(10)
       
  return (
    <Flex justifyContent="space-between" flexDir='row-reverse' alignItems="center" px='20px' mt="4">
        <Flex flexDir={'row-reverse'}>
            <Flex alignSelf='center'>
                <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                leftIcon={<FaAngleLeft />}
                colorScheme="ash"
                variant="outline"
                size="sm"
                border='none'
                />

                <Button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                rightIcon={<FaAngleRight />}
                colorScheme="ash"
                variant="outline"
                size="sm"
                border='none'
                />
            </Flex>
            <Text alignSelf='center' width='100px'>
            Page{' '}
            <Text as="span" fontWeight="bold">
                {pageIndex + 1}
            </Text>{' '}
            of{' '}
            <Text as="span" fontWeight="bold">
                {pageOptions.length}
            </Text>
            </Text>
            <Flex width='210px'>
                <Text alignSelf='center' mr='10px'>Rows per page:</Text>
                <ReusableDropdown options={[{value:10, label:10},{value:20, label:20},{value:30, label:30},{value:50, label:50},{value:100, label:100},]} defaultValue={10} placeholder='' value={tableRows} onChange={(e)=>setTableRows(e.target.value)} />
            </Flex>
        </Flex>  
        <Flex color='primary-blue'>
          <Text>{tableData.length} results found</Text>
        </Flex>      
      </Flex>
  )
}

export default TableFooter