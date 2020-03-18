import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import CardRecordsTable from "./components/CardRecordTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getCardRecords } from "../actions/cardRecords.actions";
import { withRouter } from "react-router-dom";

const CardRecordsList = ({ dispatch, cardRecord, history, location }) => {
  const fetchRequests = () => {
    if (location.state && location.state.customerInfo) {
      dispatch(getCardRecords(location.state.customerInfo.encryptedCustomerId));
    } else {
      history.push("/customers");
    }
  };

  useEffect(() => {
    if (location.state && location.state.customerInfo) {
      dispatch(getCardRecords(location.state.customerInfo.encryptedCustomerId));
    } else {
      history.push("/customers");
    }
  }, [dispatch, location, history]);

  return (
    <Container>
      <PageHeader
        header="Manage Card Records"
        subheader="Manage card records"
      />
      <Row>
        <CardRecordsTable
          dataState={cardRecord}
          customerInfo={
            location && location.state ? location.state.customerInfo : null
          }
          fetchData={fetchRequests}
        />
      </Row>
    </Container>
  );
};
export default withRouter(
  connect(state => ({
    cardRecord: state.getCardRecords
  }))(CardRecordsList)
);
