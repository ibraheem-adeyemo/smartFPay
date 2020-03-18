import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import BatchCustomerstable from "./components/BatchCustomerstable";
import PageHeader from "../../../shared/components/PageHeader";
import { getCustomers } from "../actions/customers.actions";

const BatchCustomersList = ({ dispatch, customers, match }) => {
  const fetchRequests = requestParams => {
    dispatch(getCustomers(requestParams));
  };

  useEffect(() => {
    dispatch(getCustomers({ page: 1, pageSize: 10 }, match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Container>
      <PageHeader
        header="Manage Batch Customers"
        subheader="Manage prepaid card customers"
      />
      <Row>
        <BatchCustomerstable
          batchId={match.params.id}
          dataState={customers}
          fetchData={fetchRequests}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  customers: state.getCustomers
}))(BatchCustomersList);
