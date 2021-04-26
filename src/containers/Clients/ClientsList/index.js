import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Container, Modal, ModalFooter, ModalBody, ModalHeader, Row } from "reactstrap";
import ClientsTable from "./components/ClientsTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getClients, setGivenClient } from "../actions/clients.actions";

const ClientsList = ({ dispatch, allClients, clientsPost }) => {

  const { givenClient } = clientsPost;

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
        <SecretModal
          visible={Boolean(givenClient)}
          givenClient={givenClient}
          dismiss={() => setGivenClient(dispatch)}
        />
      </Row>
    </Container>
  );
};

const SecretModal = props =>
{
  const { visible, givenClient = {}, dismiss } = props;
  const [justCopiedID, setJustCopiedID] = useState(false);
  const [justCopiedSecret, setJustCopiedSecret] = useState(false);

  const copyIDToClipboard = async () => {
    await navigator.clipboard.writeText(givenClient.clientId)
    setJustCopiedID(true);
    setTimeout(() => setJustCopiedID(false), 1300)
  }

  const copySecretToClipboard = async () => {
    await navigator.clipboard.writeText(givenClient.clientSecret)
    setJustCopiedSecret(true);
    setTimeout(() => setJustCopiedSecret(false), 1300)
  }

  return (
    <Modal isOpen={visible}>
      <ModalHeader><span className="title">Credentials for "{givenClient.clientName}"</span></ModalHeader>
      <ModalBody>
        <div className="generated-token-wrapper">
          <strong className="key">Client ID:</strong>
          <span className="generated-token">
            {givenClient.clientId}
          </span>
          <Button
            color={justCopiedID ? "success" : "primary"}
            type="button"
            onClick={copyIDToClipboard}
            outline
            size="sm"
          >
            {justCopiedID ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </div>

        <div className="generated-token-wrapper">
          <div className="key">
            <strong>Client Secret:</strong>
            <div className="info">Be sure to keep this somewhere safe. You won't see it again after this window is dismissed. </div>
          </div>
          <span className="generated-token">
            {givenClient.clientSecret}
          </span>
          <Button
            color={justCopiedSecret ? "success" : "primary"}
            type="button"
            onClick={copySecretToClipboard}
            outline
            size="sm"
          >
            {justCopiedSecret ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={dismiss}>Dismiss</Button>
      </ModalFooter>
    </Modal>
  )
}


export default connect(state => ({
  allClients: state.clients,
  clientsPost: state.clientsPost
}))(ClientsList);
