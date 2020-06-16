/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { memo, useState } from "react";
import { Card, CardBody, Col, ButtonToolbar } from "reactstrap";
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

const {
  CREATE_CUSTOMER
} = permissionsConstants;

const CustomersTable = memo(
  ({ dataState, fetchData, permissions, history, location, batchId }) => {
    const [searchKey, setSearchKey] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const toggleModal = () => {
      setShowModal(prev => !prev);
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
            name={`${row.firstName} ${row.lastName}`}
          />
        ),
        sortable: true,
        sortKey: "id"
      },
      {
        accessor: "firstName",
        name: "First Name",
        sortable: true,
        sortKey: "FirstName"
      },
      {
        accessor: "lastName",
        name: "Last Name",
        sortable: true,
        sortKey: "LastName"
      },
     /*  {
        accessor: "dateOfBirth",
        name: "Date of Birth",
        sortable: true,
        sortKey: "dateOfBirth",
        Cell: row => appUtils.formatDOB(row.dateOfBirth)
      }, */
      {
        accessor: "emailAddress",
        name: "Account Number",
        sortable: true,
        sortKey: "emailAddress"
      },
      // {
      //   accessor: "issuerName",
      //   name: "Issuer",
      //   sortable: true,
      //   sortKey: "issuerName"
      // },
      {
        accessor: "mobileNr",
        name: "Mobile Number",
        sortable: true,
        sortKey: "mobileNr"
      },
     /*  {
        accessor: "city",
        name: "Address City",
        sortable: true,
        sortKey: "city"
      },
      {
        accessor: "countryCode",
        name: "Address Country",
        sortable: true,
        sortKey: "countryCode"
      } */
    ];

    const sortFn = (page, pageSize, column) => {
      let sortOrder = "ASC";
      if (!dataState.loading) {
        if (dataState.request && dataState.request.sortOrder) {
          sortOrder = dataState.request.sortOrder === "ASC" ? "DESC" : "ASC";
        }
        fetchData({
          ...dataState.request,
          page,
          pageSize,
          sortKey: column.sortKey,
          sortOrder
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
        page: 1,
        searchWord: values.searchWord || ""
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
      {
        name: "view_cards",
        btnText: "View Cards",
        btnAction: handleAction,
        btnClass: "info",
        btnIcon: MdCreditCard,
        permissions: [permissionsConstants.VIEW_CUSTOMER_CARDS]
      }
    ];

    const loadData = (page, pageSize) => {
      fetchData({
        ...dataState.request,
        page,
        pageSize,
        searchWord: searchKey
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
    permissions: state.permissions && state.permissions.response,
    toggleuser: state.toggleuser
  }))(CustomersTable)
);
