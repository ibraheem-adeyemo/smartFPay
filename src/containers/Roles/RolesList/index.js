import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import RolesTable from "./components/RolesTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getRoles } from "../actions/roles.actions";

const RolesList = ({ dispatch, allRoles }) => {
  const loadRoles = () => dispatch(getRoles({}));

  useEffect(() => {
    dispatch(getRoles({}));
  }, [dispatch]);

  return (
    <Container>
      <PageHeader
        header="Manage Roles"
        subheader="View and Create Roles"
      />
      <Row>
        <RolesTable dataState={allRoles} fetchData={loadRoles} />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  allRoles: state.roles
}))(RolesList);
