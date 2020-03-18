import React from "react";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { createCardRequests } from "../actions/cardrequests.actions";
import CardCreateForm from "./components/Form";
import PageHeader from "../../../shared/components/PageHeader";
import { withRouter } from "react-router-dom";


const CardRequestForm = props => {
  const { dispatch, history } = props;
  const createCard = values => {
    dispatch(createCardRequests(values, history));
  };

  return (
    <Container>
      <PageHeader
        header="Create Card"
        subheader="Create bulk and single card requests"
      />
      <Row>
        <CardCreateForm onSubmit={createCard} />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  currentUser: state.currentUser
}))(withRouter(CardRequestForm));
