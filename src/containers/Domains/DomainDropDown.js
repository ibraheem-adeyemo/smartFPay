import React, { useEffect } from "react";
import renderSelectField from "../../shared/components/form/Select";
import { Field } from "redux-form";
import { connect } from "react-redux";
import { getAllDomains } from "./actions/domain.actions";
import { Alert, Spinner } from "reactstrap";
import { MdRefresh } from "react-icons/md";

const DomainDropDown = props => {
  const { domains, label, dispatch, onChange, disabled, id, required } = props;

  const getDomains = () => {
    dispatch(getAllDomains());
  };

  useEffect(() => {
    const getDomains = () => {
      dispatch(getAllDomains());
    };
    getDomains();
  }, [dispatch]);

  return (
    <div className="form__form-group">
      <span className={`form__form-group-label ${required ? "required" : ""}`}>
        {label}
      </span>
      <div className="form__form-group-field">
        <Field
          id={id}
          name="domains"
          disabled={disabled}
          customChange={onChange}
          component={renderSelectField}
          options={domains.response || []}
          valueKey="code"
          labelKey="name"
        />
      </div>
      {domains && domains.error ? (
        <Alert color="danger">
          Could not fetch domains
          {domains.loading ? (
            <Spinner className="float-right" size="sm" color="danger" />
          ) : (
            <MdRefresh
              onClick={getDomains}
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
  domains: state.domains
}))(DomainDropDown);
