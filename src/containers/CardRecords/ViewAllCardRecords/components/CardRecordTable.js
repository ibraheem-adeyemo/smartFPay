/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { memo, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { MdInsertDriveFile } from "react-icons/md";
import DataTable from "../../../../shared/components/DataTable";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import ModalComponent from "../../../../shared/components/Modal";
import ViewCardRecord from "../../ViewCardRecord";

const CardRecordsTable = memo(
  ({ dataState, fetchData, permissions, customerInfo }) => {
    const toggleModal = () => {
      setShowModal(prev => !prev);
    };

    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const count =
      dataState && dataState.response && dataState.response.data
        ? dataState.response.data.length
        : 0;

    const cardData =
      dataState && dataState.response ? dataState.response.data : [];

    const columns = [
      {
        accessor: "firstName",
        name: "First name",
        sortable: true,
        filterable: true,
        sortKey: "firstName"
      },
      {
        accessor: "lastName",
        name: "Last name",
        sortable: true,
        filterable: true,
        sortKey: "lastName"
      },
      {
        accessor: "nameOnCard",
        name: "Name on Card",
        sortable: true,
        filterable: true,
        sortKey: "nameOnCard"
      },
      {
        accessor: "maskedPan",
        name: "Masked Card PAN",
        sortable: true,
        sortKey: "maskedPan"
      },
      {
        accessor: "expiryDate",
        name: "Expiry Date",
        sortable: true,
        filterable: true,
        sortKey: "expiryDate"
      }
    ];

    const handleAction = (row, action) => {
      if (action.name === "view_cardRecord") {
        toggleModal();
        setSelectedRow(row);
      }
    };

    const actions = [
      {
        name: "view_cardRecord",
        btnText: "Manage Card",
        btnAction: handleAction,
        btnClass: "success",
        btnIcon: MdInsertDriveFile,
        permissions: [permissionsConstants.VIEW_CARD_DETAILS]
      }
    ];

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">
                Cards{" "}
                {!!customerInfo &&
                  `for ${`${customerInfo.firstName} ${customerInfo.lastName}`} `}
                {customerInfo ? (
                  <Link to="/customers" id="link-all-customers">
                    (Back to customers)
                  </Link>
                ) : null}
              </h5>
            </div>

            <DataTable
              columns={columns}
              loading={dataState && dataState.loading}
              data={cardData}
              permissions={permissions}
              count={count}
              countName="cards"
              defaultPageSize={10}
              defaultPageNumber={1}
              loadData={fetchData}
              error={dataState && dataState.error}
              bordered={true}
              striped={true}
              hover={true}
              actions={actions}
            />
          </CardBody>
        </Card>
        <ModalComponent
          isOpen={showModal}
          toggle={toggleModal}
          size="lg"
        >
          <ViewCardRecord isModal selectedCard={selectedRow} />
        </ModalComponent>
      </Col>
    );
  }
);

export default withRouter(
  connect(state => ({
    permissions: state.permissions && state.permissions.response,
  }))(CardRecordsTable)
);
