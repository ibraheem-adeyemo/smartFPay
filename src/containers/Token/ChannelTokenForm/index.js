import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import { generateChannelToken, resetChannelToken } from "../actions/token.actions";
import HorizontalForm from './components/ChannelTokenForm';
import PageHeader from "../../../shared/components/PageHeader";

const ChannelTokenForm = ({ dispatch, location, history }) => {
  const generateToken = values => {
    dispatch(
      generateChannelToken(values)
    );
  };

  useEffect(()=> {
    return () => {
      dispatch(resetChannelToken());
    };
  }, [dispatch]);

  return (
    <Container>
      <PageHeader
        header={`Generate Channel Token`}
      />
      <Row>
        <HorizontalForm
          onSubmit={generateToken}
        />
      </Row>
    </Container>
  )
  };

export default connect(state=> ({
}))(ChannelTokenForm);
