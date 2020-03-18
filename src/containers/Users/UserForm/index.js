import React, { useEffect } from "react";
import {  Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { postUser, getUser, resetViewUser } from "../actions/user.actions";
import HorizontalForm from "./components/UserForm";
import PageHeader from "../../../shared/components/PageHeader";

const UserForm = ({ dispatch, currentUser, user, match }) => {

  const createFormData = user => {
    let userData;
    const hasUser =
    match.params.id &&
      user &&
      user.response &&
      user.response.data &&
      user.response.data.length;
    const userObj = hasUser ? user.response.data[0] : null;
    if (userObj) {
      userData = {
        first_name: userObj.firstName,
        last_name: userObj.lastName,
        email: userObj.email,
        phone_number: userObj.mobileNo
      };
    }

    return userData;
  };

  function fetchUser() {
    dispatch(getUser(match.params.id));
  }

  const addUser = values => {
    dispatch(
      postUser(values, currentUser, match.params.id, user.response)
    );
  };

  useEffect(() => {
    if (match.params.id) {
      dispatch(getUser(match.params.id));
    }
    return () => {
      dispatch(resetViewUser());
    };
  }, [dispatch, match.params.id]);

  return (
    <Container>
      <PageHeader
        header={`${match.params.id ? "Edit" : "Add"} User`}
        subheader="Create new user"
      />
      <Row>
        <HorizontalForm
          userId={match.params.id}
          user={user}
          initialValues={createFormData(user)}
          fetchData={fetchUser}
          onSubmit={addUser}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  currentUser: state.currentUser,
  user: state.viewuser
}))(UserForm);
