import React, { useEffect } from "react";
import renderDualList from "../../shared/components/form/DualList";
import { Field } from "redux-form";
import { connect } from "react-redux";
import { getRoles, resetRoles } from "./actions/roles.actions";
import { permissionsConstants } from "../../constants/permissions.constants";

const RoleDualList = props => {
  const { roles, label, dispatch, permissions, currentUser } = props;
  let userPermissions = permissions && permissions.response;

  // userPermissions =
  //   userPermissions && userPermissions.map(permission => permission.authority);

  userPermissions =
    userPermissions && userPermissions.map(permission => permission);

  const isAdmin =
    userPermissions &&
    userPermissions.includes(permissionsConstants.ASSIGN_USER_ROLE);

  const domainCode = isAdmin
    ? ""
    : currentUser && currentUser.response && currentUser.response.domainCode;

  useEffect(() => {
    const fetchRoles = () => {
      dispatch(getRoles(domainCode));
    };
    if (!isAdmin) {
      fetchRoles();
    }
    return () => dispatch(resetRoles());
  }, [dispatch, domainCode, isAdmin]);

  const options =
    roles && roles.response && roles.response.data
      ? roles.response.data.map(role => {
          var option = {};
          option["label"] = role.name;
          option["value"] = role.id;
          return option;
        })
      : [];

  return (
    <div className="form__form-group">
      <span className="form__form-group-label">{label}</span>
      <div className="form__form-group-field">
        <Field name="roles" component={renderDualList} options={options} />
      </div>
    </div>
  );
};

export default connect(state => ({
  roles: state.roles,
  permissions: state.permissions,
  currentUser: state.currentUser
}))(RoleDualList);
