/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { memo, useState } from "react";
import { Card, CardBody, Col, ButtonToolbar, Spinner } from "reactstrap";

import { Link } from "react-router-dom";
import { MdModeEdit, MdInsertDriveFile, MdLock } from "react-icons/md";
import DataTable from "../../../../shared/components/DataTable";
import { withRouter } from "react-router-dom";
import CustomSearch from "./CustomSearch";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import { getFormValues } from "redux-form";
import CustomFilter from "./CustomFilter";

const {
  VIEW_ADMIN
} = permissionsConstants;

const ReportsTable = memo(props => {
  const {
    dataState,
    fetchData,
    permissions,
    allReports
  } = props;

  const [searchKey, setSearchKey] = useState("");
  const count = dataState && dataState.response ? dataState.response.count : 0;

  const columns = [
    {
      accessor: "accountNumber",
      name: "Account Number",
      filterable: true,
      sortable: true,
      sortKey: "accountNumber"
    },
    {
      accessor: "accountName",
      name: "Account Name",
      filterable: true,
      sortable: true,
      sortKey: "accountName"
    },
    {
        accessor: "limitType",
        name: "Limit Type",
        filterable: true,
        sortable: true,
        sortKey: "limitType"
    },
    {
        accessor: "startDate",
        name: "Start date",
        filterable: true,
        sortable: true,
        sortKey: "startDate"
    },
    {
        accessor: "endDate",
        name: "End date",
        filterable: true,
        sortable: true,
        sortKey: "endDate"
    },
  ];

  const sortFn = (pageNum, pageSize, column) => {
    let sortOrder = "ASC";
    if (!allReports.loading) {
      if (allReports.request && allReports.request.sortOrder) {
        sortOrder = allReports.request.sortOrder === "ASC" ? "DESC" : "ASC";
      }
      fetchData({
        ...allReports.request,
        pageNum,
        pageSize,
        // sortKey: column.sortKey,
        // sortOrder
      });
    }
  };

  const actions = [
    // {
    //   name: "view_reports",
    //   btnText: "View",
    //   btnClass: "success",
    //   btnIcon: MdInsertDriveFile,
    //   permissions: [VIEW_ADMIN]
    // },
  ];

  const handleSubmit = values => {
    setSearchKey(values.searchWord);
    fetchData({
      ...allReports.request,
      pageNumber: 1,
      accountName: values.accountName,
      accountNumber: values.accountNumber,
      startDate: values.startDate,
      enddate: values.endDate,
      enabledChannel: values.enabledChannel,
      enabledCountry: values.enabledCountry
      // searchWord: values.searchWord || ""
    });
  };

  const loadData = (pageNumber, pageSize) => {
    fetchData({ ...allReports.request, pageNumber, pageSize, searchWord: searchKey });
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Reports</h5>
          </div>
          <DataTable
            columns={columns}
            loading={dataState && dataState.loading}
            data={
              dataState && dataState.response ? dataState.response.content : []
            }
            count={count}
            countName="Reports"
            defaultPageSize={10}
            defaultPageNumber={1}
            loadData={loadData}
            error={dataState && dataState.error}
            bordered={true}
            striped={true}
            hover={true}
            permissions={permissions}
            actions={actions}
            responsive
            customSearch={
              <CustomFilter
                pageNumber={1}
                initialValues={{
                  pageNumber: 1,
                  pageSize: 10,
                  accountNumber: "",
                  accountName: "",
                  endDate: "",
                  startDate: "",
                  enabledCountry: "",
                  enabledChannel: ""
                }}
                pageSize={10}
                onSubmit={handleSubmit}
              />
            }
            sortFn={sortFn}
            searchKey={searchKey}
            serverside
          />
        </CardBody>
      </Card>
    </Col>
  );
});

export default connect(state => ({
  searchValues: getFormValues("custom_search")(state),
  permissions: state.permissions && state.permissions.response,
  allReports: state.getauditreports
}))(withRouter(ReportsTable));
