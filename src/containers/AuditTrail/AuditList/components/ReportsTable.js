/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";

import DataTable from "../../../../shared/components/DataTable";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getFormValues } from "redux-form";
import CustomFilter from "./CustomFilter";
import {createFilterRequestBody} from "../../factories/audit.factory";


const ReportsTable = props => {
  const {
    dataState,
    fetchData,
    permissions,
    allReports,
    download,
    values
  } = props;

  const count = dataState && dataState.response ? dataState.response.count : 0;
  const [initialFetch, setInitialFetch] = useState(false);

  const columns = [
    {
      accessor: "clientIp",
      name: "Client Ip",
    },
    {
      accessor: "action",
      name: "Action",
    },
    {
      accessor: "createdBy",
      name: "Action Initiator",
    },
    {
        accessor: "logDate",
        name: "Log Date",
    },
    {
      accessor: "previousDataExist",
      name: "Prior Existence",
      Cell: row => (
        <button
          type="button"
          id={`toggle-btn-${row.previousDataExist ? "enabled" : "disabled"}-${row.id}`}
          className={`btn ${
            row.previousDataExist ? "btn-success" : "btn-secondary"
          } badge mb-0`}
        >
          {
            <span>{row.previousDataExist ? "True" : "False"}</span>
          }
        </button>
      )
    },
    {
      accessor: "actionStatus",
      name: "Status",
      sortable: true,
      sortKey: "active",
      filterable: true,
      Cell: row => (
        <button
          type="button"
          id={`toggle-btn-${row.actionStatus.toLowerCase() === 'successful' ? "enabled" : "disabled"}-${row.id}`}
          className={`btn ${row.actionStatus.toLowerCase() === 'successful' ? "btn-success" : "btn-danger"
          } badge mb-0`}
        >
          {
            <span>{row.actionStatus}</span>
          }
        </button>
      )
    }
  ];

  const sortFn = (pageNum, pageSize, column) => {
    if (!allReports.loading) {
      fetchData({
        ...allReports.request,
        pageNum,
        pageSize,
        // sortKey: column.sortKey,
        // sortOrder
      });
    }
  };

  const handleFilter = isReset => {
    let requestBody = isReset ? {} : createFilterRequestBody({
      email: values.email,
      action: values.action,
      startDate: values.startDate,
      endDate: values.endDate,
      createdBy: values.createdBy,
    });
    fetchData({
      pageSize: dataState.request?.pageSize || 10,
      pageNumber: 1,
      ...requestBody
    });
    setInitialFetch(true);
  };

  useEffect(() => {
    if (!initialFetch && values)
      handleFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

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
            <h5 className="bold-text">Audit Reports</h5>
          </div>
          <DataTable
            columns={columns}
            loading={dataState && dataState.loading}
            data={
              dataState?.response ? dataState.response.data : []
            }
            count={count}
            countName="Audit Reports"
            defaultPageSize={10}
            defaultPageNumber={1}
            loadData={loadData}
            error={dataState && dataState.error}
            bordered={true}
            striped={true}
            hover={true}
            permissions={permissions}
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
                handleFilter={handleFilter}
                handleDownload={handleDownload}
              />
            }
            sortFn={sortFn}
            serverside
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default connect(state => ({
  values: getFormValues("reports_custom_filter")(state),
  permissions: state.permissions && state.permissions.response,
  allReports: state.getauditreports
}))(withRouter(ReportsTable));
