import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import CardRequestsTable from "./components/CardRequestsTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getAllCardRequests } from "../actions/cardrequests.actions";

const CardRequestsList = ({ dispatch, requests }) => {
  const fetchRequests = requestParams => {
    dispatch(getAllCardRequests(requestParams));
  };

  useEffect(() => {
    dispatch(getAllCardRequests({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  return (
    <Container>
      <PageHeader
        header="Manage Card Requests"
        subheader="Manage card requests, create single and bulk card requests"
      />
      <Row>
        <CardRequestsTable dataState={requests} fetchData={fetchRequests} />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  requests: state.getAllCardRequests
}))(CardRequestsList);
