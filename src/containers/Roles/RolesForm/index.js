import React from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import { createRole } from "../actions/roles.actions";
import HorizontalForm from './components/RoleForm';
import PageHeader from "../../../shared/components/PageHeader";

const RoleForm = ({ dispatch, permissions }) => {
  const addRole = values => {
    dispatch(
      createRole(values)
    );
  };

  let allPermissions = [];

  for(var permission of permissions.response) {
    allPermissions.push({id: permission,label: permission});
   }

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
          permissions={allPermissions}
        />
      </Row>
    </Container>
  )
  };

export default connect(state=> ({
  permissions: state.permissions
}))(RoleForm);
