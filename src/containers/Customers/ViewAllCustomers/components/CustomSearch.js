import React from "react";
import { Field, reduxForm } from "redux-form";
import { Row, Col } from "reactstrap";
import renderSelectField from "../../../../shared/components/form/Select";
import Button from "reactstrap/lib/Button";
import { renderField } from "../../../../utils/renderfield";

const statusOptions =
[
  { label: "Subscribed", value: "SUBSCRIBED" },
  { label: "Unsubscribed", value: "UNSUBSCRIBED" }
]

const CustomSearch = props => {
  return (
    <Row>
        <form className="form form-flex" onSubmit={props.handleSubmit} style={{display: "flex"}}>
        <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
          <Field
            name="status"
            placeholder="Customer Status"
            component={renderSelectField}
            options={statusOptions}
            isClearable
            valueKey="value"
            labelKey="label"
          />
          </div>
          </div>
        </Col>
        <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
            <Field
              id="searchWord"
              name="searchWord"
              component={renderField}
              type="text"
              placeholder="Search by account number"
            />
            </div>
          </div>
        </Col>
        <Col>
          <Button
            color="primary"
            type="submit"
            id="reset-form"
          >
            Filter
          </Button>
        </Col>
      </form>
    </Row>
  );
};

export default reduxForm({
  form: "custom_search_requests",
  enableReinitialize: true
})(CustomSearch);
