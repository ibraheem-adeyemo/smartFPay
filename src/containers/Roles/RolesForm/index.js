import React from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import { createRole } from "../actions/roles.actions";
import HorizontalForm from './components/RoleForm';
import PageHeader from "../../../shared/components/PageHeader";

const RoleForm = ({ dispatch, permissions, match, location, history }) => {
  const addRole = values => {
    let roleId = match.params.id;
    let requestBody = roleId?{
      id: roleId,
      permissions: values.permissions
    }:{
      ...values
    }
    dispatch(
      createRole(requestBody, roleId, history)
    );
  };

  let allPermissions = [];

  for(var permission of permissions.response) {
    allPermissions.push({name: permission});
  }

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

  return (
    <Container>
      <PageHeader
        header={match.params.id? `${"Reassign permissions"}`:`${"Add"} Role`}
        subheader={match.params.id? `${"Modify permissions"}`:`${"Create new role"}`}
      />
      <Row>
        <HorizontalForm
          onSubmit={addRole}
          initialValues={createFormData(location.state?.role)}
          permissions={allPermissions}
          disabled={!!match.params.id}
        />
      </Row>
    </Container>
  )
  };

export default connect(state=> ({
  permissions: state.permissions
}))(RoleForm);
