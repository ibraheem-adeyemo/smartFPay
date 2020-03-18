import React, { memo } from "react";
import { Card, CardBody, Row, Col, Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import renderMultiSelectField from "../../../../shared/components/form/MultiSelect";
import renderDualList from "../../../../shared/components/form/DualList";

const HorizontalForm = memo(props => {
  const { handleSubmit, reset } = props;

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">
              <Link to="/roles">
                <MdArrowBack size={20} /> Back to roles
              </Link>
            </h5>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <Row>
              <Col lg="4">
                <div className="form__form-group">
                  <span className="form__form-group-label">Role name</span>
                  <div className="form__form-group-field">
                    <Field
                      name="role_name"
                      component="input"
                      type="text"
                      placeholder="Role name"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    Domain
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="domains"
                      component={renderMultiSelectField}
                      options={[
                        { value: "one", label: "One" },
                        { value: "two", label: "Two" }
                      ]}
                    />
                  </div>
                </div>
              </Col>
              <Col lg="8">
                <div className="form__form-group">
                  <span className="form__form-group-label">Manage Permissions</span>
                  <div className="form__form-group-field">
                    <Field
                      name="roles"
                      component={renderDualList}
                      options={[
                        { value: "one", label: "One" },
                        { value: "two", label: "Two" }
                      ]}
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <ButtonToolbar className="form__button-toolbar">
              <Button type="button" onClick={reset}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </ButtonToolbar>
          </form>
        </CardBody>
      </Card>
    </Col>
  );
});

HorizontalForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default reduxForm({
  form: "user_form"
})(HorizontalForm);
