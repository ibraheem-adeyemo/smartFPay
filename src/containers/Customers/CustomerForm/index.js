import React from "react";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { postCustomer } from "../actions/customers.actions";
import CustomerCreateForm from "./components/Form";
import PageHeader from "../../../shared/components/PageHeader";
import { withRouter } from "react-router-dom";

const CustomerForm = props => {
  const { dispatch, history, location } = props;
  const createCustomer = values => {
    dispatch(postCustomer(values, history));
  };

  return (
    <Container>
      <PageHeader
        header="Create Customer"
        subheader=""
      />
      <Row>
        <CustomerCreateForm onSubmit={createCustomer} location={location} />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  currentUser: state.currentUser
}))(withRouter(CustomerForm));
