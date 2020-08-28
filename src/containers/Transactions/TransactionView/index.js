import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import TransactionView from "./components/TransactionView";
import PageHeader from "../../../shared/components/PageHeader";

const ViewTransaction = props => {
  const {location} = props;
  console.log(location)

  return (
    <Container>
      <PageHeader header="View Transaction" subheader="View transaction details" />
      <Row>
        <TransactionView
          location={location}
        />
      </Row>
    </Container>
  );
};

export default ViewTransaction;
