import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import CustomerView from "./components/ViewCustomer";
import PageHeader from "../../../shared/components/PageHeader";
import { getCustomer } from "../actions/customers.actions";

const ViewCustomer = props => {
  const { dispatch, customer, selectedCustomer, isModal } = props;

  function fetchCustomer() {
    if (selectedCustomer) {
      dispatch(getCustomer(selectedCustomer.encryptedCustomerId));
    }
  }

  useEffect(() => {
    if (selectedCustomer && selectedCustomer.encryptedCustomerId) {
      dispatch(getCustomer(selectedCustomer.encryptedCustomerId));
    }
  }, [dispatch, selectedCustomer]);

  return (
    <Container>
      <PageHeader
        header="View Customer"
        subheader="View a customer's details"
      />
      <Row>
        <CustomerView
          customerId={!!selectedCustomer && selectedCustomer.encryptedCustomerId}
          customer={customer}
          isModal={isModal}
          fetchData={fetchCustomer}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  customer: state.getCustomer
}))(ViewCustomer);
