import React from 'react';
import { useTable, usePagination } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Box, Button,Flex, Text, Heading, } from '@chakra-ui/react';
import { FiMoreVertical, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Channelsdropdown, CountryDropdowns } from '../reusables/Dropdown';
import { DateRangeFilter } from '../reusables/DatePicker';
import SearchComponent from '../reusables/SearchComponent';
import { ButtonComponent } from '../reusables/ButtonComponent';
import { FaCircleArrowUp } from 'react-icons/fa6';
// import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

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
    Cell: () => (
      <IconButton
        aria-label="More actions"
        icon={<FiMoreVertical />}
        variant="ghost"
        size="sm"
      />
    ),
  },
];

// PaymentTable component
export const PaymentManagementTable = ({ paymentData = dummyData }) => {
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
      <Table {...getTableProps()} variant="simple" size="lg">
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
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex justifyContent="space-between" alignItems="center" mt="4">
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          leftIcon={<FiArrowLeft />}
          colorScheme="blue"
          variant="outline"
          size="sm"
        >
          Previous
        </Button>

        <Text>
          Page{' '}
          <Text as="span" fontWeight="bold">
            {pageIndex + 1}
          </Text>{' '}
          of{' '}
          <Text as="span" fontWeight="bold">
            {pageOptions.length}
          </Text>
        </Text>

        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          rightIcon={<FiArrowRight />}
          colorScheme="blue"
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </Flex>
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
            <Flex justifyContent='space-between' my='60px'>
                <SearchComponent placeholder="Search by account number, account name"
                    onSearch={(query) => console.log("Searching for:", query)} />
                    <Button colorScheme="blue" variant="outline" size="sm" height={'70px'} width='150px'>
                        Search
                    </Button>
            </Flex>
            <Box border='1px solid' borderRadius='8px' borderColor='main_light_gray'>
                <Flex py='30px' px='20px' justifyContent='space-between'>
                    <Box>
                        <Flex>
                            <Heading size='lg'>Controls</Heading>
                            <FaCircleArrowUp />
                        </Flex>
                        <Text>See a directory of all controlssetup on this system.</Text>
                    </Box>
                    <Flex>
                        <ButtonComponent size='lg' variant='outline' btnText='Download data' borderColor='main_light_gray' color='primary-text' />
                        <ButtonComponent size='lg' btnText='Create control' />
                    </Flex>
                </Flex>
                <PaymentManagementTable />
            </Box>
        </Box>
    )
}