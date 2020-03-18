import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import SingleBatchCustomerView from "./components/ViewCustomer";
import PageHeader from "../../../shared/components/PageHeader";
import { getCustomerGet } from "../actions/customers.actions";

const ViewSingleBatchCustomer = props => {
  const { dispatch, customer, selectedCustomer, isModal } = props;

  function fetchCustomer() {
    if (selectedCustomer) {
      dispatch(getCustomerGet(selectedCustomer.id));
    }
  }

  useEffect(() => {
    if (selectedCustomer && selectedCustomer.id) {
      dispatch(getCustomerGet(selectedCustomer.id));
    }
  }, [dispatch, selectedCustomer]);
  return (
    <Container>
      <PageHeader
        header="View Customer"
        subheader="View a customer's details"
      />
      <Row>
        <SingleBatchCustomerView
          customerId={!!selectedCustomer && selectedCustomer.id}
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
}))(ViewSingleBatchCustomer);
