/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { memo, useState } from "react";
import { Card, CardBody, Col, ButtonToolbar, Spinner } from "reactstrap";

import { Link } from "react-router-dom";
import { MdRefresh } from "react-icons/md";
import DataTable from "../../../../shared/components/DataTable";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import { accessControlFn } from "../../../../utils/accessControl";
import { getFormValues } from "redux-form";
import { toggleClient, refreshClientSecret } from "../../actions/clients.actions";

const {
  VIEW_ADMIN
} = permissionsConstants;

const ClientsTable = memo(props => {
  const {
    dataState,
    fetchData,
    dispatch,
    permissions = [],
    allClients,
    clientsToggle
  } = props;

  const [searchKey] = useState("");
  const count = dataState && dataState.response ? dataState.response.count : 0;

  const toggleClientFn = row => {
    confirmAlert({
      message: `Are you sure you want to ${row.disabled ? "enable" : "disable"} this client?`, // Message dialog
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            dispatch(toggleClient(row, allClients.request))
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    });
  };

  const columns = [
    {
      accessor: "clientName",
      name: "Client name",
      sortKey: "clientName"
    },
    {
      accessor: "clientId",
      name: "Client ID",
      sortKey: "clientId"
    },
    {
      accessor: "active",
      name: "Status (click to toggle)",
      sortKey: "active",
      renderHeader: () => (
        <span>
          Status <small>(click to toggle)</small>
        </span>
      ),
      Cell: row => (
        <button
          type="button"
          id={`toggle-btn-${row.disabled ? "disabled" : "enabled"}-${row.id}`}
          onClick={() =>
            accessControlFn(
              permissions,
              [VIEW_ADMIN],
              toggleClientFn,
              row
            )
          }
          className={`btn ${
            row.disabled ? "btn-secondary" : "btn-success"
          } badge mb-0`}
        >
          {clientsToggle.loading &&
          row.name === clientsToggle.request.name ? (
            <Spinner size="sm" />
          ) : (
            <span>{row.disabled ? "Disabled" : "Enabled"}</span>
          )}
        </button>
      )
    }
  ];

  const handleAction = record => {
    confirmAlert({
      message: `Are you sure you want to regenerate secret for ${record.clientName}? Existing secret for this client will be replaced.`,
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            dispatch(refreshClientSecret(record, allClients.request))
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    })
  };

  const sortFn = (pageNumber, pageSize, column) => {
    let sortOrder = "ASC";
    if (!allClients.loading) {
      if (allClients.request && allClients.request.sortOrder) {
        sortOrder = allClients.request.sortOrder === "ASC" ? "DESC" : "ASC";
      }
      fetchData({
        ...allClients.request,
        pageNumber,
        pageSize,
        sortKey: column.sortKey,
        sortOrder
      });
    }
  };

  const actions = [
    {
      name: "view_roles",
      btnText: "Reset Secret",
      btnAction: handleAction,
      btnIcon: MdRefresh,
      permissions: [VIEW_ADMIN]
    },
    // {
    //   name: "edit_roles",
    //   btnText: "Update Role",
    //   btnAction: handleAction,
    //   btnClass: "default",
    //   btnIcon: MdModeEdit,
    //   permissions: [VIEW_ADMIN]
    // },
  ];

  const loadData = () => {
    fetchData();
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Clients</h5>
            <AccessControl
              allowedPermissions={[VIEW_ADMIN]}
              renderNoAccess={() => null}
            >
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <Link
                  className="btn btn-primary products-list__btn-add"
                  to="/clients/add"
                  id="link-create-client"
                >
                  Add new client
                </Link>
              </ButtonToolbar>
            </AccessControl>
          </div>
          <DataTable
            columns={columns}
            loading={dataState && dataState.loading}
            // data={
            //   dataState && dataState.response ? dataState.response.content : []
            // }
            data={
              dataState?.response
            }
            count={count}
            countName="Roles"
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
            // customSearch={
            //   <CustomSearch
            //     pageNumber={1}
            //     initialValues={{
            //       pageNumber: 1,
            //       pageSize: 10,
            //       searchKey: ""
            //     }}
            //     pageSize={10}
            //     onSubmit={handleSubmit}
            //   />
            // }
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
  permissions: state.permissions && state.permissions.response?.permissions,
  allClients: state.clients,
  clientsToggle: state.clientsToggle
}))(withRouter(ClientsTable));
