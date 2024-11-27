import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, useSortBy, usePagination } from 'react-table';
import { setPage, setPageSize, setSearch, setSortBy, fetchTableData } from '../../store/features/tableSlice';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
  For,
  Stack,
  Select,
  Flex,
  Spinner,
  Text,
  Box,
  useDisclosure
} from '@chakra-ui/react';
import { color } from 'framer-motion';
import { GoDotFill } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from './ButtonComponent';
import { TableActionModal } from './Modal';
import { pageLinks } from '../../constants/pageLinks';
import TableFooter from './TableFooter';
import { TbCaretUpDownFilled } from "react-icons/tb";

const ActionOptions = ({isShown, onCloseOption, rowProps}) => {

    const unSubscribeText = 'This will deactivate Payment Control features temporarily. Are you sure you want to continue?'
    const subscribeText = 'This will enable Payment Control features for this customer. Are you sure you want to continue?'
    const isSubscribed = rowProps?.row?.values?.subscribe

    const navigation = useNavigate()

    const handleSubscribe = () => {
        onCloseOption()
        // navigation()
    }
    const handleViewBtn = () => {
        onCloseOption()
        navigation(`${pageLinks.customerInformation}/${pageLinks.editCustomer}`)
    }
    return (
        <Flex flexDir='column' bgColor='white'  position='absolute' border='1px solid' px='10px' width='160px' right='6rem' display={isShown ?'flex' :'none'} borderColor='main_light_gray' borderRadius={'7px'}>
            <ButtonComponent btnText='Edit Information' backgroundColor='white' onClick={handleViewBtn} _hover={{backgroundColor:'white', color:'main_light_gray'}} color='primary-text' width='fit-content' />
            
            <TableActionModal BtnComp={({onClick})=>(
                <ButtonComponent 
                    btnText={isSubscribed ? 'Unsubscribe' : 'Subscribe'} 
                    onClick={onClick} 
                    backgroundColor='white' 
                    _hover={{backgroundColor:'white', color:'main_light_gray'}} 
                    color='primary-text' 
                    width='fit-content' 
                />
            )}
            modalTitle={isSubscribed?'Unsubribe Customer':'Subscribe Customer'} >
                <Text>{isSubscribed?unSubscribeText:subscribeText}</Text>
            </TableActionModal>
        </Flex>
    )
}


const badgeRed = "#A4251A",
badgeRedBgColor = "#F4B7B5",
badgeGreen = "#36743D"

const SubscribeComponent = ({isSubscribe}) => {

    const subscriptionText = isSubscribe ? 'Subscribed' : 'Unsubscribed';
    return (<Flex p='8px' borderRadius='10px' width='fit-content' border='solid 1px' style={isSubscribe? {borderColor:badgeGreen, color:badgeGreen, backgroundColor:'#BEF2B9'} : {borderColor:badgeRed, color:badgeRed, backgroundColor:badgeRedBgColor}}>
                <Box alignSelf='center' mr='8px'>
                    <GoDotFill />    
                </Box> <Text>{subscriptionText}</Text>
            </Flex>
    )
  }

export const ReusableTable = (props) => {
    const { bgColor="main_light_gray" } = props
  const dispatch = useDispatch();
  const { data, page, pageSize, search, sortBy, totalRecords, loading } = useSelector((state) => state.tableReducer);

  const [activeRow, setActiveRow] = useState(null)

  const toggleActiveRow = (rowId) => {
    setActiveRow((prev) => prev === rowId ? null : rowId)
  }

  useEffect(() => {
    // dispatch(fetchTableData({ page, pageSize, search, sortBy }));
  }, [page, pageSize, search, sortBy, dispatch]);

  
  const columns = useMemo(() => [
    {
        Header: ()=> {
            return (
                <Flex justifyContent='center'><Text mr='8px'>Date Created</Text> <TbCaretUpDownFilled /></Flex>
            )
        },
        accessor: 'date',
    },
    { 
        Header: 'Account Number', 
        accessor: 'account_number' 
    },
    { 
        Header: 'Customer Name', 
        accessor: 'first_name', // Ensure that this matches the key in your data exactly
        Cell: ({ row }) => {
            const { first_name, last_name } = row.original; // Assuming `Last_name` is another key in your data
            return <Text>{first_name} {last_name}</Text>;
        }
    },
    
    { 
        Header: 'Core Banking ID', 
        accessor: 'core_banking_id', // Ensure that this matches the key in your data exactly
        
    },
    {
        Header: 'Channels',
        accessor: 'channels', // Ensure that this matches the key in your data exactly
    },
    { 
        Header: 'Status', 
        accessor: 'subscribe' ,
        Cell: (props) => {
            return <SubscribeComponent isSubscribe={props.value} />
        }
    },
    {
        Header: 'Actions',
        accessor: '',
        Cell: (props) => {
            return (
                <Box>
                    <Text _hover={{cursor:'pointer'}} onClick={() => toggleActiveRow(props.row.id)}>
                        <HiDotsVertical />
                    </Text>
                    {
                        activeRow === props.row.id && <ActionOptions isShown={activeRow === props.row.id} rowProps={props} onCloseOption={() => setActiveRow(null)} />
                    }
                </Box>
            )
        }
    }
  ], [activeRow]);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page: tablePage,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    setPageSize: setReactTablePageSize,
    state: { pageIndex, pageSize: reactTablePageSize },
  } = useTable(
    {
      columns,
      data: data && data.length > 0 ? data : [],
      manualPagination: true,
      manualSortBy: true,
      pageCount: Math.ceil(totalRecords / pageSize),
      initialState: {
        pageIndex: page - 1,
        pageSize,
        sortBy: [{ id: sortBy.column, desc: sortBy.order === 'desc' }],
      },
    },
    useSortBy,
    usePagination
  );

  const handleSort = (columnId) => {
    const isDesc = sortBy.column === columnId && sortBy.order === 'asc';
    dispatch(setSortBy({ column: columnId, order: isDesc ? 'desc' : 'asc' }));
  };

//   const handleSearch = (e) => {
//     dispatch(setSearch(e.target.value));
//     dispatch(setPage(1));
//   };

//   const handlePageSizeChange = (e) => {
//     const newSize = Number(e.target.value);
//     dispatch(setPageSize(newSize));
//     setReactTablePageSize(newSize);
//     dispatch(setPage(1));
//   };

  return (
    <Box>
        <Table {...getTableProps()} fontSize={{xl:'0.7rem','2xl':'1rem','3xl':'1.3rem'}} border="1px solid main_light_gray">
            <Thead bgColor={bgColor} p='25px'>
                {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()} >
                    {headerGroup.headers.map((column) => (
                    <Th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        onClick={() => handleSort(column.id)}
                        isNumeric={column.isNumeric}
                        maxW='8rem'
                    >
                        {column.render('Header')}
                        {sortBy.column === column.id && (sortBy.order === 'asc' ? ' ▲' : ' ▼')}
                    </Th>
                    ))}
                </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {tablePage.map((row) => {
                prepareRow(row);
                return (
                    <Tr {...row.getRowProps()} borderBottomColor="main_light_gray" bg='white'>
                    {row.cells.map((cell) => (
                        <Td {...cell.getCellProps()} className='retabtd' justifyContent='center'>{cell.render('Cell')}</Td>
                    ))}
                    </Tr>
                );
                })}
            </Tbody>
            </Table>
            <TableFooter pageIndex={pageIndex} canNextPage={canNextPage} canPreviousPage={canPreviousPage} pageOptions={pageOptions} nextPage={nextPage} previousPage={previousPage} tableData={data} />
    </Box>
  );
};

