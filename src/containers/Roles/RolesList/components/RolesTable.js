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

const {
  VIEW_ADMIN
} = permissionsConstants;

const RolesTable = memo(props => {
  const {
    dataState,
    fetchData,
    dispatch,
    permissions,
    allRoles
  } = props;

  const [searchKey, setSearchKey] = useState("");
  const count = dataState && dataState.response ? dataState.response.count : 0;

  const columns = [
    {
      accessor: "id",
      name: "",
      sortable: true,
      sortKey: "id"
    },
    {
      accessor: "name",
      name: "Name",
      filterable: true,
      sortable: true,
      sortKey: "name"
    },
    {
      accessor: "description",
      name: "Description",
      sortKey: "description"
    }
  ];

  const handleAction = (row, action) => {
    if (action.name === "view_roles") {
      props.history.push(`${props.location.pathname}/view/${row.username}`);
    } else if (action.name === "edit_users") {
      props.history.push(`${props.location.pathname}/edit/${row.username}`);
    } else if (action.name === "manageRoles") {
      props.history.push(`${props.location.pathname}/roles/${row.username}`);
    }
  };

  const sortFn = (pageNum, pageSize, column) => {
    let sortOrder = "ASC";
    if (!allRoles.loading) {
      if (allRoles.request && allRoles.request.sortOrder) {
        sortOrder = allRoles.request.sortOrder === "ASC" ? "DESC" : "ASC";
      }
      fetchData({
        ...allRoles.request,
        pageNum,
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
  ];

  const handleSubmit = values => {
    setSearchKey(values.searchWord);
    fetchData({
      ...allRoles.request,
      pageNum: 1,
      searchWord: values.searchWord || ""
    });
  };

  const loadData = (pageNum, pageSize) => {
    fetchData({ ...allRoles.request, pageNum, pageSize, searchWord: searchKey });
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
            data={
              dataState && dataState.response ? dataState.response.content : []
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
  allRoles: state.roles
}))(withRouter(RolesTable));
