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

const {
  VIEW_REPORTS
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
      accessor: "User",
      name: "User Name",
      filterable: true,
      sortable: true,
      sortKey: "userName"
    },
    {
      accessor: "email",
      name: "Email",
      filterable: true,
      sortable: true,
      sortKey: "email"
    },
    {
        accessor: "Description",
        name: "Description",
        filterable: true,
        sortable: true,
        sortKey: "description"
    },
    {
        accessor: "Action",
        name: "Action",
        filterable: true,
        sortable: true,
        sortKey: "action"
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
        sortKey: column.sortKey,
        sortOrder
      });
    }
  };

  const actions = [
    {
      name: "view_reports",
      btnText: "View",
      btnClass: "success",
      btnIcon: MdInsertDriveFile,
      permissions: [VIEW_REPORTS]
    },
  ];

  const handleSubmit = values => {
    setSearchKey(values.searchWord);
    fetchData({
      ...allReports.request,
      pageNum: 1,
      searchWord: values.searchWord || ""
    });
  };

  const loadData = (pageNum, pageSize) => {
    fetchData({ ...allReports.request, pageNum, pageSize, searchWord: searchKey });
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
            countName="Users"
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
              <CustomSearch
                pageNumer={1}
                initialValues={{
                  pageNumber: 1,
                  pageSize: 10,
                  searchKey: ""
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
