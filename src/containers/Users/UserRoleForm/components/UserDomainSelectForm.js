import React from "react";
import { Row, Col, Alert } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import renderSelectField from "../../../../shared/components/form/Select";

const UserDomainSelectForm = ({ selectedUserDomains }) => (
  <form className="form">
    <Row>
      <Col sm="4">
        <div className="form__form-group">
          <Alert color="info">
            The selected user belongs to multiple domains. Please select a
            preferred domain to manage
          </Alert>
          <span className="form__form-group-label required">Select Domain</span>
          <div className="form__form-group-field">
            <Field
              id="domain"
              name="domain"
              component={renderSelectField}
              options={selectedUserDomains || []}
              valueKey="code"
              labelKey="name"
            />
          </div>
        </div>
      </Col>
    </Row>
  </form>
);

export default reduxForm({
  form: "roleSelect_form",
  enableReinitialize: true
})(UserDomainSelectForm);
