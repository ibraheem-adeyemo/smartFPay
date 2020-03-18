/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { memo, useState } from "react";
import { Card, CardBody, Col, ButtonToolbar, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import {
  MdInsertDriveFile,
  /* MdFileDownload, */ MdPeople
} from "react-icons/md";
import DataTable from "../../../../shared/components/DataTable";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import CustomSearch from "./CustomSearch";
import { requestStatus } from "../../constants/cardRequests.constants";

const CardRequestsTable = memo(
  ({ dataState, fetchData, requests, permissions, history, location, domain }) => {
    const [searchKey, setSearchKey] = useState("");
    const count =
      dataState && dataState.response ? dataState.response.count : 0;

    const columns = [
      {
        accessor: "batchId",
        name: "Batch ID",
        sortable: true,
        sortKey: "batchId"
      },
      {
        accessor: "configName",
        name: "Configuration Name",
        sortable: true,
        sortKey: "configName"
      },
      {
        accessor: "createdBy",
        name: "Created By",
        sortable: true,
        sortKey: "createdBy"
      },
      {
        accessor: "count",
        name: "Cards Request Count"
      },
      {
        accessor: "creationDate",
        name: "Created On",
        Cell: row => <span>{new Date(row.creationDate).toLocaleString()}</span>
      },
      // {
      //   accessor: "status",
      //   name: "Request Status",
      //   sortKey: "status",
      //   sortable: true
      // },
      {
        accessor: "autoUploadStatus",
        name: "Status Description",
        renderHeader: () => (
          <span>
            Status <small>{domain.domainCode === "ISW" ? "(Hover on colored status for details)" : ""}</small>
          </span>
        ),
        Cell: row => {
          const currentStatus = requestStatus.filter(request => request.name === row.autoUploadStatus);
          return row.autoUploadStatus !== null && domain.domainCode === "ISW" ? (
            <React.Fragment>
              <p 
                className="badge badge-warning"
                id={`${"status_description-"}${row.batchId}`}
                style={{
                  color: currentStatus[0].fontColor,
                  background: currentStatus[0].bg
                }}
              
              >
                {currentStatus[0].name}
              </p>
              <UncontrolledTooltip
                placement="bottom"
                target={`${"status_description-"}${row.batchId}`}
              >
                {row.responseMessage}
              </UncontrolledTooltip>
            </React.Fragment>            
          ) : row.status
        }
      },
    ];

    const sortFn = (page, pageSize, column) => {
      let sortOrder = "ASC";
      if (!requests.loading) {
        if (requests.request && requests.request.sortOrder) {
          sortOrder = requests.request.sortOrder === "ASC" ? "DESC" : "ASC";
        }
        fetchData({
          ...requests.request,
          page,
          pageSize,
          sortKey: column.sortKey,
          sortOrder
        });
      }
    };

    const handleAction = (row, action) => {
      if (action.name === "view_requests") {
        history.push(`${location.pathname}/view/${row.id}`);
      } else if (action.name === "view_customers") {
        history.push(`${location.pathname}/${row.batchId}/customers`, {
          batchInfo: row
        });
      }
    };

    const handleSubmit = values => {
      setSearchKey(values.searchWord);
      fetchData({
        ...requests.request,
        page: 1,
        searchWord: values.searchWord || ""
      });
    };

    const actions = [
      {
        name: "view_customers",
        btnText: "View Customers",
        btnAction: handleAction,
        btnClass: "info",
        btnIcon: MdPeople,
        permissions: [permissionsConstants.VIEW_BATCH_CUSTOMERS]
      },
      {
        name: "view_requests",
        btnText: "Request details",
        btnAction: handleAction,
        btnClass: "success",
        btnIcon: MdInsertDriveFile,
        permissions: [permissionsConstants.VIEW_CARD_REQUEST]
      }
      /* {
        name: "download_autopay",
        btnText: "Download Funds file",
        btnAction: handleAction,
        btnClass: "secondary",
        btnIcon: MdFileDownload,
        permissions: [permissionsConstants.VIEW_CARD_REQUEST]
      } */
    ];

    const loadData = (page, pageSize) => {
      fetchData({ ...requests.request, page, pageSize, searchWord: searchKey });
    };

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Card requests</h5>
              <AccessControl
                allowedPermissions={[permissionsConstants.CREATE_CARD]}
                renderNoAccess={() => null}
              >
                <ButtonToolbar className="products-list__btn-toolbar-top">
                  <Link
                    className="btn btn-primary products-list__btn-add"
                    to="/card-requests/create"
                    id="link-create-card"
                  >
                    Create new card(s)
                  </Link>
                </ButtonToolbar>
              </AccessControl>
            </div>
            <DataTable
              columns={columns}
              loading={dataState && dataState.loading}
              data={
                dataState && dataState.response
                  ? dataState.response.content
                  : []
              }
              permissions={permissions}
              count={count}
              countName="requests"
              defaultPageSize={10}
              defaultPageNumber={1}
              loadData={loadData}
              error={dataState && dataState.error}
              bordered={true}
              striped={true}
              hover={true}
              actions={actions}
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
              responsive
              serverside
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
);

export default withRouter(
  connect(state => ({
    requests: state.getAllCardRequests,
    permissions: state.permissions && state.permissions.response,
    toggleuser: state.toggleuser,
    domain: state.currentUser && state.currentUser.response
  }))(CardRequestsTable)
);
