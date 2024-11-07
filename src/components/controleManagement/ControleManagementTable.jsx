import React, { useState} from 'react';
import { useTable, usePagination } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Box, Button,Flex, Text, Heading, } from '@chakra-ui/react';
import { FiMoreVertical, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Channelsdropdown, CountryDropdowns } from '../reusables/Dropdown';
import { DateRangeFilter } from '../reusables/DatePicker';
import SearchComponent from '../reusables/SearchComponent';
import { ButtonComponent } from '../reusables/ButtonComponent';
import { Link, useNavigate } from 'react-router-dom';
import { pageLinks } from '../../constants/pageLinks';
// import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { BsArrowCounterclockwise } from "react-icons/bs";
import TableFooter from '../reusables/TableFooter';


const ActionOptions = ({isShown}) => {

    const navigation = useNavigate()

    const handleEditBtn = () => {
        navigation(`${pageLinks.controleManagement}/${pageLinks.editCustomerAccount}`)
    }
    return (
        <Flex flexDir={'column'} position='absolute' border='1px solid' px='10px' width='160px' display={isShown ?'flex' :'none'} borderColor='main_light_gray' borderRadius={'7px'}>
            <ButtonComponent btnText='View Details' backgroundColor='white' _hover={{backgroundColor:'white', color:'main_light_gray'}} color='primary-text' width='100px' />
            <ButtonComponent btnText='Edit Control' backgroundColor='white' onClick={handleEditBtn} _hover={{backgroundColor:'white', color:'main_light_gray'}} color='primary-text' width='100px' />
        </Flex>
    )
}
// Sample dummy data for payment entries
const dummyData = [
  {
    accountNumber: '123456789',
    accountName: 'John Doe',
    enabledChannel: 'ATM',
    enabledCountry: 'Ghana',
    amountControl: '$1500',
    actions: '',
  },
  {
    accountNumber: '987654321',
    accountName: 'Jane Smith',
    enabledChannel: 'POS',
    enabledCountry: 'Kenya',
    amountControl: '$2000',
    actions: '',
  },
  {
    accountNumber: '123456789',
    accountName: 'John Doe',
    enabledChannel: 'POS',
    enabledCountry: 'Nigeria',
    amountControl: '$1500',
    actions: '',
  },
  {
    accountNumber: '987654321',
    accountName: 'Jane Smith',
    enabledChannel: 'WEB',
    enabledCountry: 'Kenya',
    amountControl: '$2000',
    actions: '',
  },
  // Add more dummy data as needed
];

// Table columns configuration
const columns = [
  {
    Header: 'Account Number',
    accessor: 'accountNumber',
  },
  {
    Header: 'Account Name',
    accessor: 'accountName',
  },
  {
    Header: 'Enabled Channel',
    accessor: 'enabledChannel',
  },
  {
    Header: 'Amount Control',
    accessor: 'amountControl',
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: (props) => {
        const [isShown, setIsShown] = useState(false)
        return (
            <>
            <IconButton
                aria-label="More actions"
                icon={<FiMoreVertical />}
                variant="ghost"
                size="lg"
                onClick={()=>setIsShown(!isShown)}
            />
            <ActionOptions isShown={isShown} />
        </>
        )
    }       
    ,
  },
];

// PaymentTable component
export const PaymentManagementTable = ({ paymentData = dummyData }) => {
    const [isShown, setIsShown] = useState(false)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // current page rows
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex },
        prepareRow,
      } = useTable(
        {
          columns,
          data: paymentData,
          initialState: { pageIndex: 0, pageSize: 5 }, // Set initial page size
        },
        usePagination
      );

  return (
    <Box overflowX="auto">
      <Table {...getTableProps()} variant="simple" size="md">
        <Thead bg="main_light_gray">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} borderBottomColor="main_light_gray">
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()} color="primary-text">
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} bg='white'>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} fontSize='20px' borderBottomColor="main_light_gray">
                {row.cells.map((cell) => {
                    return (
                        <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    )
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <TableFooter pageIndex={pageIndex} canNextPage={canNextPage} canPreviousPage={canPreviousPage} pageOptions={pageOptions} nextPage={nextPage} previousPage={previousPage} tableData={dummyData} />
    </Box>
  );
};

export const ControleManagementTable = () => {
    return (
        <Box>
            <Flex justifyContent='space-between'>
                <CountryDropdowns />
                <Channelsdropdown />
                <DateRangeFilter />
            </Flex>
            <Flex justifyContent='space-between' my='30px'>
                <SearchComponent placeholder="Search by account number, account name"
                    onSearch={(query) => console.log("Searching for:")} />
                    <Button colorScheme="blue" variant="outline" size="sm" height={'50px'} width='100px' alignSelf='center'>
                        Search
                    </Button>
            </Flex>
            <Box border='1px solid' borderRadius='8px' borderColor='main_light_gray'>
                <Flex py='30px' px='20px' justifyContent='space-between'>
                    <Box>
                        <Flex>
                            <Heading size='lg' mr='20px'>Controls</Heading>
                            <Flex alignSelf='center' color='primary-blue' width='50px' pt='7px'>
                                <BsArrowCounterclockwise fontSize='25px' mt='4px' />

                            </Flex>
                        </Flex>
                        <Text mt='10px'>See a directory of all controlssetup on this system.</Text>
                    </Box>
                    <Flex>
                        <ButtonComponent size='lg' ml='20px' py='30px' variant='outline' btnText='Download data' borderColor='main_light_gray' color='primary-text' />
                        <ButtonComponent size='lg' as={Link} to={`${pageLinks.controleManagement}/${pageLinks.userAccount}`} ml='20px' py='30px' btnText='Create control' />
                    </Flex>
                </Flex>
                <PaymentManagementTable />
            </Box>
        </Box>
    )
}