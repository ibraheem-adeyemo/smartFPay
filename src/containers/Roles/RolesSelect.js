import React, { useEffect } from "react";
import renderSelectField from "../../shared/components/form/Select";
import { Field } from "redux-form";
import { connect } from "react-redux";
import { getRoles, resetRoles } from "./actions/roles.actions";
import { Alert, Spinner } from "reactstrap";
import { MdRefresh } from "react-icons/md";
import { permissionsConstants } from "../../constants/permissions.constants";

const RolesSelect = props => {
  const { roles, label, dispatch, permissions, currentUser, id, required } = props;
  let userPermissions = permissions && permissions.response;

  // userPermissions =
  //   userPermissions && userPermissions.map(permission => permission.authority);
  userPermissions =
    userPermissions && userPermissions.map(permission => permission);

  const fetchRoles = () => {
    dispatch(getRoles());
  };

  useEffect(() => {
    dispatch(getRoles());
    return () => dispatch(resetRoles());
  }, [dispatch]);

  return (
    <div className="form__form-group">
      <span className={`form__form-group-label ${required ? "required" : ""}`}>{label}</span>
      <div className="form__form-group-field">
        <Field
          id={id}
          name="roles"
          component={renderSelectField}
          options={roles?.response || []}
          isMulti = {true}
          valueKey="id"
          labelKey="name"
        />
      </div>
      {roles && roles.error ? (
        <Alert color="danger">
          Could not fetch roles
          {roles.loading ? (
            <Spinner className="float-right" size="sm" color="danger" />
          ) : (
            <MdRefresh
              onClick={fetchRoles}
              className="float-right pointer"
              size={20}
            />
          )}
        </Alert>
      ) : null}
    </div>
  );
};

export default connect(state => ({
  roles: state.roles,
  permissions: state.getPermissions,
  currentUser: state.currentUser
}))(RolesSelect);
