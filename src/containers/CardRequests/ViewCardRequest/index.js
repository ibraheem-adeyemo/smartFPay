import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import CardRequestView from "./components/ViewCardRequest";
import PageHeader from "../../../shared/components/PageHeader";
import { getCardRequest } from "../actions/cardrequests.actions";

const ViewCardRequest = props => {
  const { dispatch, cardRequest } = props;

  function fetchCardRequest() {
    dispatch(getCardRequest(props.match.params.id));
  }

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(getCardRequest(props.match.params.id));
    }
  }, [dispatch, props.match.params.id]);

  return (
    <Container>
      <PageHeader header="View Card Request" subheader="View card request details" />
      <Row>
        <CardRequestView
          cardRequestId={props.match.params.id}
          cardRequest={cardRequest}
          fetchData={fetchCardRequest}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  cardRequest: state.getCardRequest
}))(ViewCardRequest);
