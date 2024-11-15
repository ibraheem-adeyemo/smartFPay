import React, { useState} from 'react';
import { useTable, usePagination } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Box, Button,Flex, Text, Heading, HStack, } from '@chakra-ui/react';
import { FiMoreVertical, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Channelsdropdown, CountryDropdowns } from '../reusables/Dropdown';
import { DatePickerComponent, DateRangeFilter } from '../reusables/DatePicker';
import SearchComponent from '../reusables/SearchComponent';
import { ButtonComponent } from '../reusables/ButtonComponent';
import { Link, useNavigate } from 'react-router-dom';
import { pageLinks } from '../../constants/pageLinks';
// import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { BsArrowCounterclockwise } from "react-icons/bs";
import TableFooter from '../reusables/TableFooter';
import { DownloadModal } from '../reusables/DownloadModal';
import { TableActionModal } from '../reusables/Modal';


// const ActionOptions = ({isShown}) => {

//     const navigation = useNavigate()

//     const handleEditBtn = () => {
//         onClose();
//         navigation(`${pageLinks.controlManagement}/${pageLinks.editCustomerAccount}`)
//     }
//     const handleViewBtn = () => {
//         onClose();
//         navigation(`${pageLinks.controlManagement}/${pageLinks.limitDetail}`)
//     }
//     return (
//         <Flex flexDir={'column'} position='absolute' border='1px solid' px='10px' width='160px' display={isShown ?'flex' :'none'} borderColor='main_light_gray' borderRadius={'7px'}>
//             <ButtonComponent btnText='View Details' backgroundColor='white' onClick={handleViewBtn} _hover={{backgroundColor:'white', color:'main_light_gray'}} color='primary-text' width='100px' />
//             <ButtonComponent btnText='Edit Control' backgroundColor='white' onClick={handleEditBtn} _hover={{backgroundColor:'white', color:'main_light_gray'}} color='primary-text' width='100px' />
//         </Flex>
//     )
// }

// ActionOptions component to show actions for each row
const ActionOptions = ({ isShown, onClose }) => {
  const navigate = useNavigate();

  const handleEditBtn = () => {
    onClose();
    navigate(`${pageLinks.controlManagement}/${pageLinks.editCustomerAccount}`);
  };

  const handleViewBtn = () => {
    onClose();
    navigate(`${pageLinks.controlManagement}/${pageLinks.limitDetail}`);
  };

  return (
    <Flex
      flexDir="column"
      position="absolute"
      border="1px solid"
      px="10px"
      width="160px"
      display={isShown ? 'flex' : 'none'}
      borderColor="main_light_gray"
      borderRadius="7px"
    >
      <ButtonComponent
        btnText="View Details"
        backgroundColor="white"
        onClick={handleViewBtn}
        _hover={{ backgroundColor: 'white', color: 'main_light_gray' }}
        color="primary-text"
        width="100px"
      />
      <ButtonComponent
        btnText="Edit Control"
        backgroundColor="white"
        onClick={handleEditBtn}
        _hover={{ backgroundColor: 'white', color: 'main_light_gray' }}
        color="primary-text"
        width="100px"
      />
    </Flex>
  );
};

// Sample dummy data for payment entries
const dummyData = [
  {
    accountNumber: '123456789',
    accountName: 'Binford Ltd',
    enabledChannel: 'ATM',
    enabledCountry: 'Ghana',
    amountControl: '8599250',
    actions: '',
  },
  {
    accountNumber: '987654321',
    accountName: 'Biffco Enterprises Ltd',
    enabledChannel: 'POS',
    enabledCountry: 'Kenya',
    amountControl: '7665368',
    actions: '',
  },
  {
    accountNumber: '123456789',
    accountName: 'Acme Co',
    enabledChannel: 'POS',
    enabledCountry: 'Nigeria',
    amountControl: '3211500',
    actions: '',
  },
  {
    accountNumber: '0046538876',
    accountName: 'Barone LLC',
    enabledChannel: 'WEB',
    enabledCountry: 'Kenya',
    amountControl: '2900',
    actions: '',
  },
  {
    accountNumber: '987654321',
    accountName: 'Abstergo Ltd',
    enabledChannel: 'POS',
    enabledCountry: 'Zimbabwe',
    amountControl: '7665368',
    actions: '',
  },
  {
    accountNumber: '123456789',
    accountName: 'Acme Co',
    enabledChannel: 'POS',
    enabledCountry: 'Nigeria',
    amountControl: '6445090',
    actions: '',
  },
  {
    accountNumber: '0034156225',
    accountName: 'Big Kahuna Burger Ltd',
    enabledChannel: 'WEB',
    enabledCountry: 'Kenya',
    amountControl: '4090120',
    actions: '',
  },
  // Add more dummy data as needed
];

// Table columns configuration
// const columns = [
//   {
//     Header: 'Account Number',
//     accessor: 'accountNumber',
//   },
//   {
//     Header: 'Account Name',
//     accessor: 'accountName',
//   },
//   {
//     Header: 'Enabled Channel',
//     accessor: 'enabledChannel',
//   },
//   {
//     Header: 'Amount Control',
//     accessor: 'amountControl',
//     Cell: (props) => {
//         const currencyCode = '₦'
//         return `${currencyCode}${Number(props.value).toLocaleString()}`
//     }
//   },
//   {
//     Header: 'Actions',
//     accessor: 'actions',
//     Cell: (props) => {
//         const [activeRow, setActiveRow] = useState(null)

//         const toggleActiveRow = (row) => {
            
//             setActiveRow((prev) => {
//                 return row.id === prev? null : row.id
//             })
//         }

//         console.log(activeRow, 'activeRow.id, ')
//         const closeActionOption = () => {
//             setActiveRow(null)
//         }
//         return (
//             <>
//             {/* <TableActionModal>
//                 <ActionOptions />
//             </TableActionModal> */}
//             <IconButton
//                 aria-label="More actions"
//                 icon={<FiMoreVertical />}
//                 variant="ghost"
//                 size="lg"
//                 onClick={()=>toggleActiveRow(props.row)}
//             />
//             <ActionOptions isShown={activeRow === props.row.id} onClose={closeActionOption} />
//         </>
//         )
//     }       
//     ,
//   },
// ];

// PaymentTable component
export const PaymentManagementTable = ({ paymentData = dummyData }) => {

    const [activeRow, setActiveRow] = useState(null);

    const toggleActiveRow = (rowId) => {
      setActiveRow((prev) => (rowId === prev ? null : rowId));
    };
  
    const columns = React.useMemo(() =>[
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
        Cell: (props) => {
          const currencyCode = '₦';
          return `${currencyCode}${Number(props.value).toLocaleString()}`;
        },
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => (
          <>
            <IconButton
              aria-label="More actions"
              icon={<FiMoreVertical />}
              variant="ghost"
              size="lg"
              onClick={() => toggleActiveRow(props.row.id)}
            />
            {
                activeRow === props.row.id && (
                    <ActionOptions
                        isShown={activeRow === props.row.id}
                        onClose={() => setActiveRow(null)}
                    />
                )
            }
          </>
        ),
      },
    ], [activeRow]);    

    const [isShown, setIsShown] = useState(false)
    const currencyCode = '₦'
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
      <Table {...getTableProps()} variant="simple">
        <Thead bg="main_light_gray">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} borderBottomColor="main_light_gray">
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()} style={{ textTransform: 'capitalize', fontSize:'18px', height:'50px' }}  color="primary-text">
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} bg='white' fontSize='16px'>
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

export const ControlManagementTable = () => {
    return (
        <Box>
            <HStack spacing={6}>
                <CountryDropdowns inputFieldWidth='25%' />
                <Channelsdropdown inputFieldWidth='25%' />
                <DatePickerComponent width='25%' borderRadius='8px' size='sm' label='Start Date' bgColor='white' />
                <DatePickerComponent width='25%' borderRadius='8px' size='sm' label='End Date' bgColor='white' />
            </HStack>
            <Flex justifyContent='space-between' my='2rem'>
                <SearchComponent placeholder="Search by account number, account name"
                    onSearch={(query) => console.log("Searching for:")} />
                    <Button colorScheme="blue" variant="outline" size="md" bgColor='light-blue' height={'70px'} width='130px' alignSelf='center'>
                        Search
                    </Button>
            </Flex>
            <Box border='1px solid' borderRadius='8px' bgColor='white' borderColor='main_light_gray'>
                <Flex py='30px' px='20px' justifyContent='space-between'>
                    <Box width='50%'>
                        <Flex>
                            <Heading size='lg' mr='20px'>Controls</Heading>
                            <Flex alignSelf='center' color='base_popblue' width='50px' pt='7px'>
                                <BsArrowCounterclockwise fontSize='1rem' fontWeight='700' mt='4px' />
                            </Flex>
                        </Flex>
                        <Text mt='10px' color='text_gray'>See a directory of all controls setup on this system.</Text>
                    </Box>
                    <Flex width='50%'>
                        {/* <ButtonComponent size='lg' ml='20px' py='30px' variant='outline' btnText='Download data' borderColor='main_light_gray' color='primary-text' /> */}
                        <DownloadModal />
                        <ButtonComponent size='lg' as={Link} to={`${pageLinks.controlManagement}/${pageLinks.userAccount}`} ml='20px' py='30px' btnText='Create control' />
                    </Flex>
                </Flex>
                <PaymentManagementTable />
            </Box>
        </Box>
    )
}