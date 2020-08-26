import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import { generateChannelToken, resetChannelToken } from "../actions/token.actions";
import HorizontalForm from './components/ChannelTokenForm';
import PageHeader from "../../../shared/components/PageHeader";

const ChannelTokenForm = ({ dispatch, match, location, history }) => {
  const generateToken = values => {
    dispatch(
      generateChannelToken(values)
    );
  };

  useEffect(()=> {
    // return () => {
    //   dispatch(resetChannelToken());
    // };
  }, [dispatch]);

  const createFormData = role => {
    let roleData;
    const hasRole = match.params.id && location.state?.role;
    const roleObj = hasRole ? location.state?.role : null;
    let permissions = [];
    if(roleObj?.permissions) {
      for(let i = 0; i < roleObj.permissions.length; ++i) {
        permissions.push({name: roleObj.permissions[i].name});
      }
    }
    if(roleObj) {
      roleData = {
        id: roleObj.id,
        role_name: roleObj.name,
        permissions
      }
    }
    return roleData;
  }

  console.log(location);

  return (
    <Container>
      <PageHeader
        header={`Generate Channel Token`}
      />
      <Row>
        <HorizontalForm
          onSubmit={generateChannelToken}
        />
      </Row>
    </Container>
  )
  };

export default connect(state=> ({
}))(ChannelTokenForm);
