/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { memo, useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import DataTable from "../../../../shared/components/DataTable";
import { connect } from "react-redux";
import CardSearchForm from "./CardSearchForm";
import { searchCards, resetSearch } from "../../actions/cardSearch.actions";
import { MdInsertDriveFile } from "react-icons/md";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import ModalComponent from "../../../../shared/components/Modal";
import { formValueSelector } from "redux-form";
import { appUtils } from "../../../../utils/app.utils";
import ViewCardRecord from "../../../CardRecords/ViewCardRecord";

const CardSearchTable = memo(
  ({ permissions, dispatch, cardRecord, searchParams }) => {
    useEffect(() => {
      return () => {
        dispatch(resetSearch());
      };
    }, [dispatch]);

    const toggleModal = () => {
      setShowModal(prev => !prev);
    };

    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const count =
      cardRecord && cardRecord.response ? cardRecord.response.count : 0;

    const cardData =
      cardRecord && cardRecord.response ? cardRecord.response.cardDetails : [];
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
    const searchCardRecord = values => {
      dispatch(searchCards({ ...values, page: 1, pageSize: 10 }));
    };

    const loadData = (page, pageSize) => {
      if (!appUtils.isEmptyObject(searchParams)) {
        dispatch(searchCards({ ...searchParams, page, pageSize }));
      }
    };

    const sortFn = (page, pageSize, column) => {
      let sortOrder = "ASC";
      if (!cardRecord.loading) {
        if (cardRecord.request && cardRecord.request.sortOrder) {
          sortOrder = cardRecord.request.sortOrder === "ASC" ? "DESC" : "ASC";
        }
        loadData({
          ...cardRecord.request,
          page,
          pageSize,
          sortKey: column.sortKey,
          sortOrder
        });
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

    const resetSearchRecords = () => {
      dispatch(resetSearch());
    };

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Search card record</h5>
            </div>
            <CardSearchForm
              loading={cardRecord && cardRecord.loading}
              onSubmit={searchCardRecord}
              resetSearch={resetSearchRecords}
            />

            <DataTable
              columns={columns}
              loading={cardRecord && cardRecord.loading}
              data={cardData}
              permissions={permissions}
              count={count}
              countName="cards"
              defaultPageSize={10}
              defaultPageNumber={1}
              loadData={loadData}
              actions={actions}
              NoDataText={
                cardRecord && cardRecord.response
                  ? "No card record found"
                  : "Please enter search criteria"
              }
              error={cardRecord && cardRecord.error}
              bordered={true}
              sortFn={sortFn}
              striped={true}
              hover={true}
              serverside
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

const selector = formValueSelector("card_search_form");

export default connect(state => ({
    cardRecord: state.searchCards,
    permissions: state.permissions && state.permissions.response,
    searchParams: selector(state, "pan", "cardProgram", "issuerNumber", "firstName", "lastName", "sequenceNumber")
  }))(CardSearchTable);
