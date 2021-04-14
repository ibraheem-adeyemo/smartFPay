import React, {useState} from "react";
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
import { Field, reduxForm } from "redux-form";

const CustomerAccountInformation = ({customer, submitting, onSubmit,invalid}) => {
    const [accountNumber, setAccountNumber] = useState('');
    const handleChange = (e) => {
      setAccountNumber(e.currentTarget.value);
    }

    const handleGetCustomer = (e) => {
      e.preventDefault();
      onSubmit(accountNumber);
    }
    return(
        <Col md={12} lg={12}>
      <Card>
        <CardBody>
                <form className="form" onSubmit={handleGetCustomer}>
                  {
                  customer?.error?.errors?.length ? (
                    <UncontrolledAlert color="danger">
                      <h5 className="font-weight-bold">
                        Please check the following fields for errors
                      </h5>
                      {customer.error.errors.map(err => (
                        <p>
                          <strong>{err.field}:</strong> {err.message}
                        </p>
                      ))}
                    </UncontrolledAlert>
                  ) : null}
                  <Row>
                  <Col lg ="4">
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
                            value={accountNumber}
                            onChange={handleChange}
                            placeholder="Customer Account Number"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <ButtonToolbar className="form__button-toolbar">
                    <Button
                      color="primary"
                      id="submit-btn"
                      type="submit"
                      disabled={submitting || invalid}
                    >
                      {customer?.loading ? (
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
