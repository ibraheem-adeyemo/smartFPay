import React from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import CardSearchTable from "./components/CardSearchTable";
import PageHeader from "../../../shared/components/PageHeader";

const CardSearch = () => (
  <Container>
    <PageHeader
      header="Search For Cards"
      subheader="Search for users' cards"
    />
    <Row>
      <CardSearchTable />
    </Row>
  </Container>
);

export default connect(state => ({
  requests: state.getAllCardRequests
}))(CardSearch);
