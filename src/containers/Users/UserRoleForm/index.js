import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { changeUserRole, getUserRole } from "../actions/user.actions";
import HorizontalForm from "./components/UserRoleForm";
import { formValueSelector } from "redux-form";

import {
  getUser,
  resetViewUser,
  resetGetUserRole
} from "../actions/user.actions";

let UserRoleForm = ({
  dispatch,
  userRoleMapping,
  match,
  domainCode,
  selectedUserDomains,
  selectedMultipleDomain
}) => {
  let userDomainCode = "";
  if (domainCode === "ISW") {
    if (selectedUserDomains && selectedUserDomains.length === 1) {
      userDomainCode = selectedUserDomains[0].code;
    } else if(selectedMultipleDomain) {
      userDomainCode = selectedMultipleDomain.code;
    }
  } else {
    userDomainCode = domainCode;
  }

  const fetchUser = () => {
    dispatch(
      getUserRole({
        username: match.params.id,
        domainCode: userDomainCode
      })
    );
  };

  const addUser = values => {
    dispatch(changeUserRole(values, match.params.id, userRoleMapping.response));
  };

  useEffect(() => {
    if (domainCode === "ISW") {
      dispatch(getUser(match.params.id));
    }
    return () => {
      dispatch(resetViewUser());
    };
  }, [dispatch, match.params.id, domainCode]);

  useEffect(() => {
    if (match.params.id && userDomainCode) {
      dispatch(
        getUserRole({
          username: match.params.id,
          domainCode: userDomainCode
        })
      );
    }
    return () => {
      dispatch(resetGetUserRole());
    };
  }, [dispatch, match.params.id, userDomainCode]);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Manage User's Role</h3>
        </Col>
      </Row>
      <Row>
        <HorizontalForm
          userId={match.params.id}
          user={userRoleMapping}
          fetchData={fetchUser}
          selectedUserDomains={selectedUserDomains}
          onSubmit={addUser}
        />
      </Row>
    </Container>
  );
};

const selector = formValueSelector("roleSelect_form");

export default connect(state => ({
  selectedMultipleDomain: selector(state, "domain"),
  userRoleMapping: state.getuserrole,
  selectedUserDomains:
    state.viewuser &&
    state.viewuser.response &&
    state.viewuser.response.data &&
    state.viewuser.response.data.length &&
    state.viewuser.response.data[0].domains
      ? state.viewuser.response.data[0].domains
      : [],
  domainCode:
    state.currentUser &&
    state.currentUser.response &&
    state.currentUser.response.domainCode
      ? state.currentUser.response.domainCode
      : ""
}))(UserRoleForm);
