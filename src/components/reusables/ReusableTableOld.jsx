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
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from './ButtonComponent';
import { TableActionModal } from './Modal';
import { pageLinks } from '../../constants/pageLinks';
import TableFooter from './TableFooter';
import { TbCaretUpDownFilled } from "react-icons/tb";


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

