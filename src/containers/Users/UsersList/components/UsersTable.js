/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { memo, useState } from "react";
import { Card, CardBody, Col, ButtonToolbar, Spinner } from "reactstrap";

import { Link } from "react-router-dom";
import { MdModeEdit, MdInsertDriveFile, MdLock } from "react-icons/md";
import DataTable from "../../../../shared/components/DataTable";
import { withRouter } from "react-router-dom";
import CustomSearch from "./CustomSearch";
import { toggleUser } from "../../actions/user.actions";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import { accessControlFn } from "../../../../utils/accessControl";
import Avatar from "react-avatar";
import { getFormValues } from "redux-form";

const {
  CREATE_USER,
  ENABLE_USER,
  DISABLE_USER,
  VIEW_USER,
  UPDATE_USER,
  CHANGE_USER_ROLE
} = permissionsConstants;

const UsersTable = memo(props => {
  const {
    dataState,
    fetchData,
    dispatch,
    toggleuser,
    permissions,
    allUsers
  } = props;

  const [searchKey, setSearchKey] = useState("");
  const count = dataState && dataState.response ? dataState.response.count : 0;

  const toggleUserFn = row => {
    confirmAlert({
      message: `Are you sure you want to ${row.active ? "disable" : "enable"} this user?`, // Message dialog
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            dispatch(toggleUser(row.username, row.active, "getAllUsers", allUsers.request))
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
      name: "",
      Cell: row => (
        <Avatar
          round={true}
          size="32"
          name={`${row.firstName} ${row.lastName}`}
        />
      ),
      sortable: true,
      sortKey: "id"
    },
    {
      accessor: "firstName",
      name: "First Name",
      filterable: true,
      sortable: true,
      sortKey: "firstName"
    },
    {
      accessor: "lastName",
      name: "Last Name",
      filterable: true,
      sortable: true,
      sortKey: "lastName"
    },
    {
      accessor: "email",
      name: "Email",
      filterable: true,
      sortable: true,
      sortKey: "email"
    },
    {
      accessor: "mobileNo",
      name: "Phone Number",
      sortable: true,
      sortKey: "mobileNo"
    },
    {
      accessor: "active",
      name: "Status (click to toggle)",
      sortable: true,
      sortKey: "active",
      renderHeader: () => (
        <span>
          Status <small>(click to toggle)</small>
        </span>
      ),
      filterable: true,
      Cell: row => (
        <button
          type="button"
          id={`toggle-btn-${row.active ? "enabled" : "disabled"}-${row.id}`}
          onClick={() =>
            accessControlFn(
              permissions,
              [ENABLE_USER, DISABLE_USER],
              toggleUserFn,
              row
            )
          }
          className={`btn ${
            row.active ? "btn-success" : "btn-secondary"
          } badge mb-0`}
        >
          {toggleuser.loading &&
          row.username === toggleuser.request.username ? (
            <Spinner size="sm" />
          ) : (
            <span>{row.active ? "Enabled" : "Disabled"}</span>
          )}
        </button>
      )
    }
  ];

  const handleAction = (row, action) => {
    if (action.name === "view_users") {
      props.history.push(`${props.location.pathname}/view/${row.username}`);
    } else if (action.name === "edit_users") {
      props.history.push(`${props.location.pathname}/edit/${row.username}`);
    } else if (action.name === "manageRoles") {
      props.history.push(`${props.location.pathname}/roles/${row.username}`);
    }
  };

  const sortFn = (pageNum, pageSize, column) => {
    let sortOrder = "ASC";
    if (!allUsers.loading) {
      if (allUsers.request && allUsers.request.sortOrder) {
        sortOrder = allUsers.request.sortOrder === "ASC" ? "DESC" : "ASC";
      }
      fetchData({
        ...allUsers.request,
        pageNum,
        pageSize,
        sortKey: column.sortKey,
        sortOrder
      });
    }
  };

  const actions = [
    {
      name: "view_users",
      btnText: "View",
      btnAction: handleAction,
      btnClass: "success",
      btnIcon: MdInsertDriveFile,
      permissions: [VIEW_USER]
    },
    {
      name: "edit_users",
      btnText: "Edit",
      btnAction: handleAction,
      btnClass: "default",
      btnIcon: MdModeEdit,
      permissions: [UPDATE_USER]
    },
    {
      name: "manageRoles",
      btnText: "Manage Roles",
      btnAction: handleAction,
      btnClass: "info",
      btnIcon: MdLock,
      permissions: [CHANGE_USER_ROLE]
    }
  ];

  const handleSubmit = values => {
    setSearchKey(values.searchWord);
    fetchData({
      ...allUsers.request,
      pageNum: 1,
      searchWord: values.searchWord || ""
    });
  };

  const loadData = (pageNum, pageSize) => {
    fetchData({ ...allUsers.request, pageNum, pageSize, searchWord: searchKey });
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Users</h5>
            <AccessControl
              allowedPermissions={[CREATE_USER]}
              renderNoAccess={() => null}
            >
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <Link
                  className="btn btn-primary products-list__btn-add"
                  to="/users/add"
                  id="link-create-user"
                >
                  Add new user
                </Link>
              </ButtonToolbar>
            </AccessControl>
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
  allUsers: state.getusers,
  toggleuser: state.toggleuser
}))(withRouter(UsersTable));