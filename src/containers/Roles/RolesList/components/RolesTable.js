/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { memo, useState } from "react";
import { Card, CardBody, Col, ButtonToolbar } from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdSearch, MdModeEdit, MdPageview, MdLock } from "react-icons/md";
import DataPaginationTable from "../../../../shared/components/table/DataPaginationTable";
import Pagination from "../../../../shared/components/pagination/Pagination";

const StatusFormatter = ({ value }) =>
  value === "Enabled" ? (
    <span className="badge badge-success">Enabled</span>
  ) : (
    <span className="badge badge-disabled">Disabled</span>
  );

StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired
};

const DataTable = memo(props => {
  const heads = [
    {
      key: "id",
      name: "#",
      width: 80
    },
    {
      key: "role",
      name: "Role Name",
      sortable: true
    },
    {
      key: "domain",
      name: "Domain",
      sortable: false
    },
    {
      key: "status",
      name: "Status",
      sortable: true,
      formatter: StatusFormatter
    }
  ];

  const selectRow = row => {
    console.log(row);
  };

  const actions = [
    {
      name: "view",
      btnText: "View",
      btnAction: selectRow,
      btnClass: "success",
      btnIcon: MdPageview
    },
    {
      name: "edit",
      btnText: "Edit",
      btnAction: selectRow,
      btnClass: "default",
      btnIcon: MdModeEdit
    },
    {
      name: "permissions",
      btnText: "Manage Permissions",
      btnAction: selectRow,
      btnClass: "info",
      btnIcon: MdLock
    }
  ];

  const initialPageNumber = 1;
  const initialRowsCount = 10;

  const minRows = 20;
  const maxRows = 41;
  const rowsCount = Math.random() * (maxRows - minRows);

  const originalRows = createRows(rowsCount + minRows);
  const currentPageRows = filterRows(
    originalRows,
    initialPageNumber,
    initialRowsCount
  );

  const [rows] = useState(originalRows);
  const [rowsToShow, setRowsToShow] = useState(currentPageRows);
  const [pageOfItems, setPageOfItems] = useState(initialPageNumber);
  const [itemsToShow] = useState(initialRowsCount);

  function onChangePage(pageOfItems) {
    if (pageOfItems) {
      const rowsToShow = filterRows(rows, pageOfItems, itemsToShow);
      setRowsToShow(rowsToShow);
      setPageOfItems(pageOfItems);
    }
  }

  function createRows(numberOfRows) {
    const rows = [];
    for (let i = 1; i < numberOfRows + 1; i += 1) {
      rows.push({
        id: i,
        role: ["SUPER_ADMIN", "BANK_ADMIN  ", "BANK_USER"][Math.floor(Math.random() * 3)],
        status: ["Enabled", "Disabled"][Math.floor(Math.random() * 2)],
        domain: ["Interswitch, Ecobank", "Guaranty Trust Bank", "Polaris Bank"][
          Math.floor(Math.random() * 3)
        ]
      });
    }
    return rows;
  }

  function filterRows(originalRows, pageNumber, rowsOnPage) {
    const rowsFrom = rowsOnPage * (pageNumber - 1);
    const rowsTo = rowsFrom + rowsOnPage;
    return originalRows.slice(rowsFrom, rowsTo);
  }

  function handleGridSort(sortColumn, sortDirection) {
    const comparer = (a, b) => {
      if (sortDirection === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      }
      if (sortDirection === "DESC") {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };

    const sortRows = originalRows.slice(0);
    const rows =
      sortDirection === "NONE"
        ? originalRows.slice(0, 10)
        : sortRows.sort(comparer).slice(0, 10);

    const rowsToShow = filterRows(rows, pageOfItems, itemsToShow);
    setRowsToShow(rowsToShow);
  }

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Roles</h5>
            <ButtonToolbar className="products-list__btn-toolbar-top">
              <form className="form">
                <div className="form__form-group products-list__search">
                  <input placeholder="Search..." name="search" />
                  <MdSearch />
                </div>
              </form>
              <Link
                className="btn btn-primary products-list__btn-add"
                to="/roles/add"
              >
                Add new role
              </Link>
            </ButtonToolbar>
          </div>
          <p>
            Show
            <select className="select-options">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            entries
          </p>
          <DataPaginationTable
            onGridSort={handleGridSort}
            actions={actions}
            heads={heads}
            rows={rowsToShow}
          />
          <Pagination
            itemsCount={rows.length}
            itemsToShow={itemsToShow}
            pageOfItems={pageOfItems}
            onChangePage={onChangePage}
          />
        </CardBody>
      </Card>
    </Col>
  );
});

export default DataTable;
