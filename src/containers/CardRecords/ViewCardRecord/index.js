import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import CardRecordView from "./components/ViewCardRecord";
import PageHeader from "../../../shared/components/PageHeader";
import { getCardRecord } from "../actions/cardRecords.actions";

const ViewCardRecord = props => {
  const { dispatch, cardRecord, selectedCard, isModal } = props;

  function fetchCardRecord() {
    if (selectedCard) {
      dispatch(
        getCardRecord({
          encryptedPan: selectedCard.encryptedPan,
          sequenceNumber: selectedCard.seqNr,
          issuerNumber: selectedCard.issuerNr,
          expiryDate: selectedCard.expiryDate
        })
      );
    }
  }

  useEffect(() => {
    if (selectedCard) {
      dispatch(
        getCardRecord({
          encryptedPan: selectedCard.encryptedPan,
          sequenceNumber: selectedCard.seqNr,
          issuerNumber: selectedCard.issuerNr,
          expiryDate: selectedCard.expiryDate
        })
      );
    }
  }, [dispatch, selectedCard]);

  return (
    <Container>
      <PageHeader
        header="View Card Details"
        subheader="View card record details"
      />
      <Row>
        <CardRecordView
          cardRecordId={!!selectedCard && selectedCard.encryptedPan}
          cardRecord={cardRecord}
          isModal={isModal}
          fetchData={fetchCardRecord}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  cardRecord: state.getCardRecord
}))(ViewCardRecord);
