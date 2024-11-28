import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Spinner,
  Flex,
  Text,
} from '@chakra-ui/react';

export const ReusableTable = ({
  columnsConfig, // Array of column definitions
  data = [], // Table data
  isLoading = false, // Loading state
  onSort, // Callback for sorting
  onPageChange, // Callback for pagination
  onPageSizeChange, // Callback for page size change
  pageCount = 0, // Total pages
  pageIndex = 0, // Current page
  pageSize = 10, // Rows per page
  isServerSide = false, // Flag for server-side operations
  renderRowActions, // Function to render custom row actions
  bgColor = 'main_light_gray', // Table header background color
  footerComponent, // Custom footer component
}) => {
  const columns = useMemo(() => columnsConfig, [columnsConfig]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Current page rows (client-side only)
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    setPageSize,
    state: { pageIndex: internalPageIndex, pageSize: internalPageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: isServerSide,
      manualSortBy: isServerSide,
      pageCount,
      initialState: { pageIndex, pageSize },
    },
    useSortBy,
    usePagination
  );

  const handleSort = (columnId) => {
    if (onSort) onSort(columnId);
  };

  const handlePageChange = (newPage) => {
    if (onPageChange) onPageChange(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    if (onPageSizeChange) onPageSizeChange(newSize);
  };

  return (
    <Box>
      {isLoading && (
        <Flex justify="center" align="center" p={4}>
          <Spinner />
        </Flex>
      )}
      {!isLoading && (
        <>
          <Table {...getTableProps()} fontSize={{xl:'0.7rem','2xl':'1rem','3xl':'1.3rem'}} border="1px solid main_light_gray">
            <Thead bgColor={bgColor} p='25px'>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      onClick={() => handleSort(column.id)}
                      isNumeric={column.isNumeric}
                      maxW="8rem"
                    >
                      {column.render('Header')}
                      {column.isSorted && (column.isSortedDesc ? ' ▼' : ' ▲')}
                    </Th>
                  ))}
                  <Th>Actions</Th>
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {page.length > 0 ? (
                    page.map((row) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} borderBottom="1px solid main_light_gray" bg="white">
                              {row.cells.map((cell) => (
                                <Td {...cell.getCellProps()} textAlign='center'>{cell.render('Cell')}</Td>
                              ))}
                              {renderRowActions && (
                                <Td>{renderRowActions(row)}</Td>
                              )}
                            </Tr>
                          );
                    })
                    ) : (
                    <Tr>
                        <Td colSpan={columns.length}>No Data Available</Td>
                    </Tr>
                )}
              {/* {page.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} borderBottom="1px solid main_light_gray" bg="white">
                    {row.cells.map((cell) => (
                      <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    ))}
                    {renderRowActions && (
                      <Td>{renderRowActions(row)}</Td>
                    )}
                  </Tr>
                );
              })} */}
            </Tbody>
          </Table>
          {footerComponent && footerComponent({
            pageIndex: internalPageIndex,
            canNextPage,
            pageOptions,
            canPreviousPage,
            nextPage,
            previousPage,
            onPageChange: handlePageChange,
          })}
        </>
      )}
    </Box>
  );
};
