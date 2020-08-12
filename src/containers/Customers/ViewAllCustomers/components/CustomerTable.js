/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { memo, useState } from "react";
import { Card, CardBody, Col, ButtonToolbar, UncontrolledAlert,Spinner } from "reactstrap";
import {
  MdInsertDriveFile,
  /* MdModeEdit, */
  MdCreditCard
} from "react-icons/md";
import DataTable from "../../../../shared/components/DataTable";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import CustomSearch from "./CustomSearch";
import { Link } from "react-router-dom";import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import { accessControlFn } from "../../../../utils/accessControl";
import ModalComponent from "../../../../shared/components/Modal";
import ViewCustomer from "../../ViewCustomer";
import Avatar from "react-avatar";
import { getCustomers } from "../../reducers";
import {subscribeCustomer, unsubscribeCustomer} from '../../actions/customers.actions';
import { confirmAlert } from "react-confirm-alert";

const {
  CREATE_CUSTOMER,
  VIEW_ADMIN
} = permissionsConstants;

const CustomersTable = memo(
  ({ dataState, dispatch, fetchData, permissions = [], history, location, batchId, togglecustomer, allCustomers }) => {
    const [searchKey, setSearchKey] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const toggleModal = () => {
      setShowModal(prev => !prev);
    };

    const toggleCustomerFn = row => {
      confirmAlert({
        message: `Are you sure you want to ${row.customerStatus === "SUBSCRIBED" ? "UNSUBSCRIBE" : "SUBSCRIBE"} this customer?`, // Message dialog
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              if(row.customerStatus === "SUBSCRIBED"){
                dispatch(unsubscribeCustomer(row, allCustomers.request));
                }else {
                  dispatch(subscribeCustomer(row, allCustomers.request))
                }
            }
          },
          {
            label: "No",
            onClick: () => null
          }
        ]
      });
    };

    const count =
      dataState && dataState.response ? dataState.response.count : 0;
    const customerData =
      dataState && dataState.response ? dataState.response.data : [];
      
    const columns = [
      {
        accessor: "id",
        name: "",
        Cell: row => (
          <Avatar
            round={true}
            size="32"
            name={`${row.name}`}
            // name={`${row.firstName} ${row.lastName}`}
          />
        ),
        // sortable: true,
        sortKey: "id"
      },
      {
        accessor: "accountNumber",
        name: "Account Number",
      },
      {
        accessor: "name",
        name: "Customer Name",
      },
      // {
      //   accessor: "lastName",
      //   name: "Last Name",
      //   sortable: true,
      //   sortKey: "LastName"
      // },
      {
        accessor: "customerStatus",
        name: "Status",
        // filterable: true,
        Cell: row => (
          <button
            type="button"
            id={`toggle-btn-${row.customerStatus === 'SUBSCRIBED' ? "enabled" : "disabled"}-${row.id}`}
            onClick={() =>
              accessControlFn(
                permissions,
                [VIEW_ADMIN],
                toggleCustomerFn,
                row
              )
            }
            className={`btn ${
              row.customerStatus === 'SUBSCRIBED' ? "btn-success" : "btn-secondary"
            } badge mb-0`}
          >
            {togglecustomer.loading &&
          row.accountNumber === togglecustomer.request.accountNumber ? (
            <Spinner size="sm" />
          ) : (
            <span>{row.customerStatus}</span>
          )}
          </button>
        )
      },
      {
        accessor: "coreBankingId",
        name: "Core Banking Id",
        sortable: true,
        sortKey: "coreBankingId"
      },
    ];
console.log('dataState', dataState)
    const sortFn = (pageNumber, pageSize, column) => {
      let sortOrder = "ASC";
      let sortKey = column.sortKey;
      if (!dataState.loading) {
        if (dataState.request && dataState.request.sortOrder) {
          sortOrder = dataState.request.sortOrder === "ASC" ? "DESC" : "ASC";
        }
        fetchData({
          ...dataState.request,
          pageNumber,
          pageSize,
          // sortKey,
          // sortOrder
        });
      }
    };

    const handleAction = (row, action) => {
      if (action.name === "edit_customers") {
        history.push(`${location.pathname}/edit/${row.id}`);
      } else if (action.name === "view_customer") {
        toggleModal();
        setSelectedRow(row);
      } else if (action.name === "view_cards") {
        history.push(`/customers/cards`, { customerInfo: row });
      }
    };

    const handleSubmit = values => {
      setSearchKey(values.searchWord);
      fetchData({
        ...dataState.request,
        pageNumber: 1,
        accountNumber: values.searchWord || ""
      });
    };

    const actions = [
      /* {
        name: "edit_customers",
        btnText: "Update Customer",
        btnAction: handleAction,
        btnClass: "default",
        btnIcon: MdModeEdit,
        permissions: []
      }, */
      {
        name: "view_customer",
        btnText: "View Customer",
        btnAction: handleAction,
        btnClass: "success",
        btnIcon: MdInsertDriveFile,
        permissions: [permissionsConstants.VIEW_CUSTOMER]
      },
      // {
      //   name: "view_cards",
      //   btnText: "View Cards",
      //   btnAction: handleAction,
      //   btnClass: "info",
      //   btnIcon: MdCreditCard,
      //   permissions: [permissionsConstants.VIEW_CUSTOMER_CARDS]
      // }
    ];

    const loadData = (pageNumber = 1, pageSize = 10) => {
      fetchData({
        pageNumber,
        pageSize,
      });
    };
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">
                Customers{" "}
                {batchId && location.state && location.state.batchInfo ? (
                  <span>
                    for request with Batch ID {batchId}{" "}
                    <Link to="/card-requests" id="link-all-cardRequests">
                      (Back to card requests)
                    </Link>
                  </span>
                ) : null}
              </h5>
              <AccessControl
              allowedPermissions={[CREATE_CUSTOMER]}
              renderNoAccess={() => null}
            >
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <Link
                  className="btn btn-primary products-list__btn-add"
                  to="/customers/add"
                  id="link-create-customer"
                >
                  Add new customer
                </Link>
              </ButtonToolbar>
            </AccessControl>
            </div>
            {false ? (
                    <UncontrolledAlert color="danger">
                      <h5 className="font-weight-bold">
                        Please check the following filters for errors
                      </h5>
                      {/* {dataState.error.errors.map(err => (
                        <p>
                          <strong>{err.field}:</strong> {err.message}
                        </p>
                      ))} */}
                    </UncontrolledAlert>
                  ) : null}
            <DataTable
              columns={columns}
              loading={dataState && dataState.loading}
              data={customerData}
              permissions={permissions}
              count={count}
              countName="customers"
              defaultPageSize={10}
              defaultPageNumber={1}
              loadData={loadData}
              error={dataState && dataState.error}
              bordered={true}
              striped={true}
              hover={true}
              NoDataText={'No Customers Found'}
              // actions={actions}
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
        <ModalComponent
          isOpen={showModal}
          toggle={toggleModal}
          size="lg"
        >
          <ViewCustomer isModal selectedCustomer={selectedRow} />
        </ModalComponent>
      </Col>
    );
  }
);

export default withRouter(
  connect(state => ({
    permissions: state.permissions && state.permissions.response?.permissions,
    togglecustomer: state.togglecustomer,
    allCustomers: state.getCustomers
  }))(CustomersTable)
);
