import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ReusableTable } from '../reusables/ReusableTable';
import { SearchAndFilter } from '../reusables/SearchAndFilter';
import { TableTopComponent } from '../reusables/TableTopComponent';
import { pageLinks } from '../../constants/pageLinks';
import { TableActionModal } from '../reusables/Modal';
import { customerTableColumns } from './customerTableHeading';
import { ActionComponent, ActionOptions } from './CustomerInfoTableAction';
import { useSelector } from 'react-redux';
import { setPage, setPageSize, setPageIndex, setSearch, setSortBy, fetchTableData } from '../../store/features/tableSlice';
import TableFooter from '../reusables/TableFooter';


const CustomerInfoTable = () => {

    const [activeRow, setActiveRow] = useState(null)
    const { data, pageSize, pageCount, search, sortBy, pageIndex, totalRecords, loading } = useSelector((state) => state.tableReducer);

    const handleSort = (columnId) => {
        console.log('Sort by:', columnId);
        // Handle sorting logic
      };

    const toggleActiveRow = (rowId) => {
    setActiveRow((prev) => prev === rowId ? null : rowId)
    }

    const handlePageChange = (newPage) => {
        console.log('Page change:', newPage);
        setPageIndex(newPage);
        // Fetch new data if server-side
    };

    const handlePageSizeChange = (newSize) => {
        console.log('Page size change:', newSize);
        setPageSize(newSize);
        // Fetch new data if server-side
      };
  return (
    <Box>
        <SearchAndFilter />
        <Box border='1px solid' borderRadius='8px' bgColor='white' borderColor='main_light_gray'>
            <TableTopComponent tableTopTitle='Customers' tableTopText='See a directory of all customers created.' btnText='Create Customer' linkTo={pageLinks.createCustomer} />
            <ReusableTable
                columnsConfig={customerTableColumns(activeRow, setActiveRow)}
                data={data}
                isLoading={false}
                onSort={handleSort}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                pageCount={Math.ceil(data.length / pageSize)}
                pageIndex={pageIndex}
                pageSize={pageSize}
                isServerSide={false}
                renderRowActions={(row) => (<ActionComponent row={row} activeRow={activeRow} setActiveRow={setActiveRow} toggleActiveRow={toggleActiveRow} rowProps={row} />)}
                footerComponent={({nextPage, previousPage, canNextPage, canPreviousPage, pageOptions,}) => (
                    <TableFooter pageIndex={pageIndex} canNextPage={canNextPage} canPreviousPage={canPreviousPage} pageOptions={pageOptions} nextPage={nextPage} previousPage={previousPage} tableData={data} />
                )} />
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
