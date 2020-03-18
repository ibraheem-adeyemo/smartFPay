import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import UserView from "./components/UserView";
import PageHeader from "../../../shared/components/PageHeader";
import { getUser, resetViewUser } from "../actions/user.actions";

const ViewUser = props => {
  const { dispatch, user } = props;

  function fetchUser() {
    dispatch(getUser(props.match.params.id));
  }

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(getUser(props.match.params.id));
    }
    return () => {
      dispatch(resetViewUser());
    };
  }, [dispatch, props.match.params.id]);

  return (
    <Container>
      <PageHeader header="View User" subheader="View user's information" />
      <Row>
        <UserView
          userId={props.match.params.id}
          user={user}
          fetchData={fetchUser}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  user: state.viewuser
}))(ViewUser);
