import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import ClientsTable from "./components/ClientsTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getClients } from "../actions/clients.actions";

const ClientsList = ({ dispatch, allClients }) => {
  const loadClients = () => dispatch(getClients({}));

  useEffect(() => {
    dispatch(getClients({}));
  }, [dispatch]);

  return (
    <Container>
      <PageHeader
        header="Manage Clients"
        subheader="View and Create Clients"
      />
      <Row>
        <ClientsTable dataState={allClients} fetchData={loadClients} />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  allClients: state.clients
}))(ClientsList);
