import React, { useEffect } from "react";
import renderSelectField from "../../shared/components/form/Select";
import { Field } from "redux-form";
import { connect } from "react-redux";
import { getRoles, resetRoles } from "./actions/clients.actions";
import { Alert, Spinner } from "reactstrap";
import { MdRefresh } from "react-icons/md";
import { permissionsConstants } from "../../constants/permissions.constants";

const PermissionsSelect = props => {
  const { label, dispatch, permissions, currentUser, id, required } = props;
  let userPermissions = permissions && permissions.response;
  let perm = [];

  if(permissions.response) {
    for(var permission of permissions.response) {
      perm.push({name: permission});
    }
  }
  console.log('dfghj', permissions)
  // userPermissions =
  //   userPermissions && userPermissions.map(permission => permission.authority);
  userPermissions =
    userPermissions && userPermissions.map?.(permission => permission);

  const isAdmin = userPermissions && userPermissions.includes(permissionsConstants.VIEW_DOMAINS_ROLE);

  const domainCode = props.domainCode
    ? props.domainCode
    : isAdmin
    ? ""
    : currentUser && currentUser.response && currentUser.response.domainCode;

  const fetchRoles = () => {
    dispatch(getRoles(domainCode));
  };

  useEffect(() => {
    const fetchRoles = () => {
      dispatch(getRoles(domainCode));
    };
    if (!isAdmin || props.domainCode) {
      fetchRoles();
    }
    return () => dispatch(resetRoles());
  }, [dispatch, domainCode, isAdmin, props.domainCode]);

  return (
    <div className="form__form-group">
      <span className={`form__form-group-label ${required ? "required" : ""}`}>{label}</span>
      <div className="form__form-group-field">
        <Field
          id={id}
          name="permissions"
          component={renderSelectField}
          isMulti={true}
          options={perm || []}
          valueKey="name"
          labelKey="name"
        />
      </div>
      {permissions && permissions.error ? (
        <Alert color="danger">
          Could not fetch permissions
          {permissions.loading ? (
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
}))(PermissionsSelect);
