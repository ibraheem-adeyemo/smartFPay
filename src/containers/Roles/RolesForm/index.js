import React from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import { createRole } from "../actions/roles.actions";
import HorizontalForm from './components/RoleForm';
import PageHeader from "../../../shared/components/PageHeader";

const RoleForm = ({ dispatch }) => {
  const addRole = values => {
    dispatch(
      createRole(values)
    );
  };

  return (
    <Container>
      <PageHeader
        header={`${"Add"} Role`}
        subheader="Create new role"
      />
      <Row>
        <HorizontalForm
          onSubmit={addRole}
          initialValues={{name: ""}}
        />
      </Row>
    </Container>
  )
  };

export default connect(state=> ({}))(RoleForm);
