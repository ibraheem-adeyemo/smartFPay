/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { memo, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";

import { MdModeEdit, MdInsertDriveFile } from "react-icons/md";
import DataTable from "../../../../shared/components/DataTable";
import { withRouter } from "react-router-dom";
import CustomFilter from './CustomFilter';
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import { getFormValues } from "redux-form";
import { createFilterRequestBody } from "../../factories/limit.factory";

const {
  VIEW_CONTROL,
  UPDATE_CONTROL,
} = permissionsConstants;

const LimitsTable = memo(props => {
  const {
    dataState,
    fetchData,
    permissions = [],
    allControls,
    download,
    values
  } = props;

  const [searchKey, setSearchKey] = useState("");
  const count = dataState && dataState.response ? dataState.response.count : 0;

  // const toggleAccountFn = row => {
  //   confirmAlert({
  //     message: `Are you sure you want to ${row.active ? "disable" : "enable"} limit controls on this account?`, // Message dialog
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () =>
  //           dispatch(toggleAccountControl(row.accountNumber, row.active, "getAllControls", allControls.request))
  //       },
  //       {
  //         label: "No",
  //         onClick: () => null
  //       }
  //     ]
  //   });
  // };
  
  // const toggleCardFn = row => {
  //   confirmAlert({
  //     message: `Are you sure you want to ${row.active ? "disable" : "enable"} limit controls on this card?`, // Message dialog
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () =>
  //           dispatch(toggleCardControl(row.cardId, row.active, "getAllControls", allControls.request))
  //       },
  //       {
  //         label: "No",
  //         onClick: () => null
  //       }
  //     ]
  //   });
  // };

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
      sortKey: "accountNumber"
    },
    // {
    //   accessor: "limitType ",
    //   name: "Account Name",
    //   filterable: true,
    //   sortable: true,
    //   sortKey: "accountName"
    // },
    {
      accessor: "limitType",
      name: "Payment Instrument",
      filterable: true,
      sortable: true,
      sortKey: "limitType"
    },
    {
      accessor: "transactionLimitAmount",
      name: "Amount Limit",
      sortable: true,
      sortKey: "transactionLimitAmount"
    },
    // {
    //   accessor: "active",
    //   name: "Status (click to toggle)",
    //   sortable: true,
    //   sortKey: "active",
    //   renderHeader: () => (
    //     <span>
    //       Status <small>(click to toggle)</small>
    //     </span>
    //   ),
    //   filterable: true,
    //   Cell: row => (
    //     <button
    //       type="button"
    //       id={`toggle-btn-${row.active ? "enabled" : "disabled"}-${row.id}`}
    //       onClick={() =>
    //         accessControlFn(
    //           permissions,
    //           [ENABLE_ACCOUNT_CONTROL, DISABLE_ACCOUNT_CONTROL, ENABLE_CARD_CONTROL, DISABLE_CARD_CONTROL],
    //           row.cardId ? toggleCardFn : toggleAccountFn,
    //           row
    //         )
    //       }
    //       className={`btn ${
    //         row.active ? "btn-success" : "btn-secondary"
    //       } badge mb-0`}
    //     >
    //       {(toggleaccount.loading) &&
    //       (row.accountNumber === toggleaccount.request.accountNumber) || (togglecard.loading) &&
    //       (row.cardId === togglecard.request.cardId) ? (
    //         <Spinner size="sm" />
    //       ) : (
    //         <span>{row.active ? "Enabled" : "Disabled"}</span>
    //       )}
    //     </button>
    //   )
    // }
  ];

  const handleAction = (row, action) => {
    if (action.name === "view_controls") {
      props.history.push(`${'/limit-requests'}/view/${row.token}`);
    } else if (action.name === "edit_controls") {
       row.limitType === 'CARD'? props.history.push(`${'/limit-requests/card'}/edit/${row.token}`): props.history.push(`${'/limit-requests'}/edit/${row.token}`);
    }
  };

  const sortFn = (pageNumber, pageSize, column) => {
    //let sortOrder = "ASC";
    if (!allControls.loading) {
      // if (allControls.request && allControls.request.sortOrder) {
      //   sortOrder = allControls.request.sortOrder === "ASC" ? "DESC" : "ASC";
      // }
      fetchData({
        ...allControls.request,
        pageNumber,
        pageSize,
      });
    }
  };

  const actions = [
    {
      name: "view_controls",
      btnText: "View",
      btnAction: handleAction,
      btnClass: "success",
      btnIcon: MdInsertDriveFile,
      permissions: [VIEW_CONTROL]
    },
    {
      name: "edit_controls",
      btnText: "Edit",
      btnAction: handleAction,
      btnClass: "default",
      btnIcon: MdModeEdit,
      permissions: [UPDATE_CONTROL]
    }
  ];

  const handleFilter = () => {
    let requestBody = createFilterRequestBody({accountNumber: values.accountNumber,
      accountName: values.accountName,
      startDate: values.startDate,
      endDate: values.endDate,
      enabledChannel: values.enabledChannel,
      enabledCountry: values.enabledCountry});
    fetchData({
      pageSize: dataState.request?.pageSize || 10,
      pageNumber: 1,
      ...requestBody
    });
  };

  const handleDownload = () => {
    download({
      ...dataState.request,
      pageNumber: 1,
      accountNumber: values.accountNumber,
      accountName: values.accountName,
      startDate: values.startDate,
      endDate: values.endDate,
      enabledChannel: values.enabledChannel,
      enabledCountry: values.enabledCountry
    });
  };

  const loadData = (pageNumber, pageSize) => {
    fetchData({ pageNumber, pageSize });
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Limit Controls</h5>
            {/* <AccessControl
              allowedPermissions={[CREATE_CONTROL]}
              renderNoAccess={() => null}
            >
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <Link
                  className="btn btn-primary products-list__btn-add"
                  to="/limit-requests/add"
                  id="link-create-control"
                >
                  Add new account control
                </Link>
                <Link
                  className="btn btn-primary products-list__btn-add"
                  to="/limit-requests/card/add"
                  id="link-create-card-control"
                >
                  Add new card control
                </Link>
              </ButtonToolbar>
            </AccessControl>  */}
          </div>
            {/* <AccessControl
              allowedPermissions={[CREATE_CARD_CONTROL]}
              renderNoAccess={() => null}
            >
              <ButtonToolbar className="products-list__btn-toolbar-top">
                
              </ButtonToolbar>
            </AccessControl> */}
          <DataTable
            columns={columns}
            loading={dataState?.loading}
            data={dataState?.response?.data || []}
            NoDataText={'No Controls Found'}
            count={count}
            countName="Controls"
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
  values: getFormValues("limits_custom_filter")(state),
  permissions: state.permissions && state.permissions.response?.permissions,
  allControls: state.getcontrols,
  toggleaccount: state.toggleaccount,
  togglecard: state.togglecard
}))(withRouter(LimitsTable));
