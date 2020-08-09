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
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import { accessControlFn } from "../../../../utils/accessControl";
import { getFormValues } from "redux-form";
import { toggleRole } from "../../actions/roles.actions";

const {
  VIEW_ADMIN
} = permissionsConstants;

const RolesTable = memo(props => {
  const {
    dataState,
    fetchData,
    dispatch,
    permissions,
    allRoles,
    togglerole
  } = props;

  const [searchKey, setSearchKey] = useState("");
  const count = dataState && dataState.response ? dataState.response.count : 0;

  const toggleRoleFn = row => {
    confirmAlert({
      message: `Are you sure you want to ${row.disabled ? "enabled" : "disable"} this user?`, // Message dialog
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            dispatch(toggleRole(row, allRoles.request))
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
      accessor: "id",
      name: "ID",
      sortable: true,
      sortKey: "id"
    },
    {
      accessor: "name",
      name: "Name",
      sortKey: "name"
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
              toggleRoleFn,
              row
            )
          }
          className={`btn ${
            row.disabled ? "btn-secondary" : "btn-success"
          } badge mb-0`}
        >
          {togglerole.loading &&
          row.name === togglerole.request.name ? (
            <Spinner size="sm" />
          ) : (
            <span>{row.disabled ? "Disabled" : "Enabled"}</span>
          )}
        </button>
      )
    }
  ];

  const handleAction = (row, action) => {
    if (action.name === "view_roles") {
      props.history.push({pathname:`${props.location.pathname}/view/${row.id}`, state: {role:row}});
    } else if (action.name === "edit_roles") {
      props.history.push({pathname:`${props.location.pathname}/edit/${row.id}`, state: {role:row}});
    }else if (action.name === "edit_users") {
      props.history.push(`${props.location.pathname}/edit/${row.username}`);
    } else if (action.name === "manageRoles") {
      props.history.push(`${props.location.pathname}/roles/${row.username}`);
    }
  };

  const sortFn = (pageNumber, pageSize, column) => {
    let sortOrder = "ASC";
    if (!allRoles.loading) {
      if (allRoles.request && allRoles.request.sortOrder) {
        sortOrder = allRoles.request.sortOrder === "ASC" ? "DESC" : "ASC";
      }
      fetchData({
        ...allRoles.request,
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
      btnText: "View",
      btnAction: handleAction,
      btnClass: "success",
      btnIcon: MdInsertDriveFile,
      permissions: [VIEW_ADMIN]
    },
    {
      name: "edit_roles",
      btnText: "Update Role",
      btnAction: handleAction,
      btnClass: "default",
      btnIcon: MdModeEdit,
      permissions: [VIEW_ADMIN]
    },
  ];

  const handleSubmit = values => {
    setSearchKey(values.searchWord);
    fetchData({
      ...allRoles.request,
      pageNumber: 1,
      searchWord: values.searchWord || ""
    });
  };

  const loadData = (pageNumber, pageSize) => {
    fetchData();
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Roles</h5>
            <AccessControl
              allowedPermissions={[VIEW_ADMIN]}
              renderNoAccess={() => null}
            >
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <Link
                  className="btn btn-primary products-list__btn-add"
                  to="/roles/add"
                  id="link-create-role"
                >
                  Add new role
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
            //     pageNumer={1}
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
  permissions: state.permissions && state.permissions.response,
  allRoles: state.roles,
  togglerole: state.togglerole
}))(withRouter(RolesTable));
