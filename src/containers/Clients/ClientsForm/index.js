import React from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import { createClient } from "../actions/clients.actions";
import HorizontalForm from './components/ClientForm';
import PageHeader from "../../../shared/components/PageHeader";

const ClientForm = ({ dispatch, match, history }) => {

  const addClient = values => {
    dispatch(
      createClient(values, history)
    );
  };

  return (
    <Container>
      <PageHeader
        header="Add Client"
        subheader="Create new client"
      />
      <Row>
        <HorizontalForm
          onSubmit={addClient}
          initialValues={{ clientName: "" }}
          disabled={!!match.params.id}
        />
      </Row>
    </Container>
  )
  };

export default connect(state => ({
  clientsPost: state.clientsPost
}))(ClientForm);
