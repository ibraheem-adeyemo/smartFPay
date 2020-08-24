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
import {createFilterRequestBody} from "../../factories/audit.factory";

const {
  VIEW_ADMIN
} = permissionsConstants;

const ReportsTable = memo(props => {
  const {
    dataState,
    fetchData,
    permissions,
    allReports,
    download,
    values
  } = props;

  const [searchKey, setSearchKey] = useState("");
  const count = dataState && dataState.response ? dataState.response.count : 0;

  const columns = [
    {
      accessor: "email",
      name: "Account Number",
      filterable: true,
      sortable: true,
      sortKey: "accountNumber"
    },
    {
      accessor: "action",
      name: "Account Name",
      filterable: true,
      sortable: true,
      sortKey: "accountName"
    },
    {
        accessor: "createdBy",
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

  const handleFilter = () => {
    let requestBody = createFilterRequestBody({
      email: values.email,
      action: values.action,
      startDate: values.startDate,
      endDate: values.endDate,
      createdBy: values.createdBy,
    });
    fetchData({
      ...dataState.request,
      pageNumber: 1,
      ...requestBody
    });
  };

  const handleDownload = () => {
    let requestBody = createFilterRequestBody({
      email: values.email,
      action: values.action,
      startDate: values.startDate,
      endDate: values.endDate,
      createdBy: values.createdBy,
    });
    download({
      ...dataState.request,
      pageNumber: 1,
      ...requestBody
    });
  }; 

  const loadData = (pageNumber, pageSize) => {
    fetchData({ ...allReports.request, pageNumber, pageSize });
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
                  email: "",
                  action: "",
                  endDate: "",
                  startDate: "",
                  createdBy: "",
                }}
                pageSize={10}
                email= ""
                action= ""
                handleFilter={handleFilter}
                handleDownload={handleDownload}
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
  values: getFormValues("reports_custom_filter")(state),
  permissions: state.permissions && state.permissions.response,
  allReports: state.getauditreports
}))(withRouter(ReportsTable));
