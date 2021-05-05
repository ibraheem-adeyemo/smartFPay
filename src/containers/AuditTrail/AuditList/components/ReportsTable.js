/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, Col, ModalHeader, ModalBody, Modal } from "reactstrap";

import DataTable from "../../../../shared/components/DataTable";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getFormValues } from "redux-form";
import CustomFilter from "./CustomFilter";
import {createFilterRequestBody} from "../../factories/audit.factory";
import { MdInsertDriveFile } from "react-icons/md";
import { ACTION_TYPES } from "../../../../constants/app.constants";


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
  const [givenReport, setGivenReport] = useState();

  const actions = [
    {
      name: "view_report_detail",
      btnText: "View",
      btnAction: row => setGivenReport(row),
      btnIcon: MdInsertDriveFile,
      permissions: []
    }
  ]

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
            actions={actions}
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
      <DetailsModal
        visible={Boolean(givenReport)}
        dismiss={() => setGivenReport()}
        givenReport={givenReport}
      />
    </Col>
  );
};

const DetailsModal = props =>
{
  const { visible, dismiss, givenReport = {} } = props;

  const actionAlias = useMemo(() =>
  {
    const _action = ACTION_TYPES.find(({value}) => givenReport.action === value);
    return _action?.label;
  }, [givenReport])

  const actionChanges = useMemo(() =>
  {
    if (!givenReport.previousData || !givenReport.updatedData)
    {
      return null;
    }
    try
    {
      const previous = JSON.parse(givenReport.previousData);
      const updated = JSON.parse(givenReport.updatedData);
      const changes = [];

      for (const prop in updated)
      {
        if (previous[prop] !== updated[prop])
        {
          changes.push(<div key={prop}>
            CHANGED {prop} <strong>FROM </strong>
            <span className="tag failure">{previous[prop]} </span>
            <strong> TO </strong>
            <span className="tag success">{updated[prop]}</span>
          </div>)
        }
      }
      return changes;
    }
    catch(e)
    {
      console.log("Error parsing changes: ", e)
      return null;
    }
    
  }, [givenReport]);

  const accountNumber = useMemo(() =>
  {
    try
    {
      const updated = givenReport.updatedData ? JSON.parse(givenReport.updatedData) : {};
      return updated.accountNumber;
    }
    catch(e)
    {
      console.log("Error parsing changes: ", e)
      return null;
    }
  }, [givenReport])

  return (
    <Modal isOpen={visible} toggle={dismiss}>
      <ModalHeader toggle={dismiss}>
        {actionAlias}
      </ModalHeader>
      <ModalBody>
        {
          accountNumber &&
          <div className="details-flex">
            <strong className="key">Account Number: </strong>
            <span className="value">
              {accountNumber}
            </span>
          </div>
        }
        <div className="details-flex">
          <strong className="key">Initiator: </strong>
          <span className="value">{givenReport.createdBy}</span>
        </div>
        <div className="details-flex">
          <strong className="key">IP Address: </strong>
          <span className="value">{givenReport.clientIp}</span>
        </div>
        <div className="details-flex">
          <strong className="key">Date/Time: </strong>
          <span className="value">
            {useMemo(() => moment(givenReport.logDate).format("lll"), [givenReport])}
          </span>
        </div>
        <div className="details-flex">
          <strong className="key">Status: </strong>
          <span className="value">{givenReport.actionStatus}</span>
        </div>
        {
          <div className="details-flex">
            <strong className="key">Changes: </strong>
            <span className="value">{actionChanges || "None"}</span>
          </div>
        }
      </ModalBody>
    </Modal>
  );
}

export default connect(state => ({
  values: getFormValues("reports_custom_filter")(state),
  permissions: state.permissions && state.permissions.response,
  allReports: state.getauditreports
}))(withRouter(ReportsTable));
