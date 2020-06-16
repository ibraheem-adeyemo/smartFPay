import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  UncontrolledAlert,
  ButtonToolbar,
  Spinner
} from "reactstrap";
import validate from "./validate";
import { connect } from "react-redux";
import { renderField } from "../../../../utils/renderfield";
import { Field, reduxForm, formValueSelector } from "redux-form";

const CustomerAccountInformation = ({values, createCustomer, submitting, onSubmit,invalid}) => {
    return(
        <Col md={12} lg={12}>
      <Card>
        <CardBody>
          {/* <div className="card__title">
            <h5 className="bold-text">
              <Link to="/customers" id="link-all-limits">
                <MdArrowBack size={20} /> Back to Customers
              </Link>
            </h5>
          </div> */}
            
                <form className="form" onSubmit={onSubmit}>
                  {createCustomer &&
                  createCustomer.error &&
                  createCustomer.error.errors &&
                  createCustomer.error.errors.length ? (
                    <UncontrolledAlert color="danger">
                      <h5 className="font-weight-bold">
                        Please check the following fields for errors
                      </h5>
                      {createCustomer.error.errors.map(err => (
                        <p>
                          <strong>{err.fieldName}:</strong> {err.message}
                        </p>
                      ))}
                    </UncontrolledAlert>
                  ) : null}
                  <Row>
                  <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                          Customer Account Number
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="accountNumber"
                            name="accountNumber"
                            component={renderField}
                            type="text"
                            placeholder="Customer Account Number"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <ButtonToolbar className="form__button-toolbar">
                    {/* <Button
                      type="button"
                      id="reset-form"
                      onClick={resetForm}
                      disabled={pristine || submitting}
                    >
                      Cancel
                    </Button> */}
                    <Button
                      color="primary"
                      id="submit-btn"
                      type="submit"
                      disabled={submitting || invalid}
                    >
                      {createCustomer && createCustomer.loading ? (
                        <span>
                          <Spinner size="sm" color="default" />{" "}
                        </span>
                      ) : null}
                      Next
                    </Button>
                  </ButtonToolbar>
                </form>
        </CardBody>
      </Card>
    </Col>
    )
}

export default reduxForm({
    form: "customer_form",
    validate,
    enableReinitialize: true
  })(connect(state=>({

  }))(CustomerAccountInformation));
// export default CustomerAccountInformation;
