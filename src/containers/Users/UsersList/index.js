import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import UsersTable from "./components/UsersTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getAllUsers } from "../actions/user.actions";

const UsersList = ({ dispatch, allUsers }) => {
  const loadUsers = requestParams => {
    dispatch(getAllUsers(requestParams));
  };

  useEffect(() => {
    dispatch(getAllUsers({ pageNumber: 1, pageSize: 10 }));
  }, [dispatch]);

  return (
    <Container>
      <PageHeader
        header="Manage Users"
        subheader="View, Create and Modify User information"
      />
      <Row>
        <UsersTable dataState={allUsers} fetchData={loadUsers} />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  allUsers: state.getusers
}))(UsersList);
