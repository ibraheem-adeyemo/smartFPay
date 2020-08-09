import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import CustomersTable from "./components/CustomerTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getCustomers } from "../actions/customers.actions";

const CustomersList = ({ dispatch, customers, match }) => {
  const fetchRequests = requestParams => {
    console.log(requestParams)
    dispatch(getCustomers(requestParams));
  };

  useEffect(() => {
    getCustomers({ page: 1, pageSize: 10 }, match.params.id);
  }, [dispatch, match.params.id]);

  return (
    <Container>
      <PageHeader
        header="Manage Customers"
        subheader="Manage payment control customers"
      />
      <Row>
        <CustomersTable
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
}))(CustomersList);
