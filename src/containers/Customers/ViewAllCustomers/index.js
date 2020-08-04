import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import CustomersTable from "./components/CustomerTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getCustomers } from "../actions/customers.actions";

const CustomersList = ({ dispatch, customers, match }) => {
  const fetchRequests = requestParams => {
    dispatch(getCustomers(requestParams));
  };

  useEffect(() => {
    dispatch(getCustomers({ pageNumber: 1, pageSize: 10 }));
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
