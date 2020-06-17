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
import { Field, reduxForm, formValueSelector } from "redux-form";

const CustomerDetails = ({createCustomer, customer, submitting, onSubmit,invalid}) => {
    const [accountNumber, setAccountNumber] = useState('');
    const handleChange = (e) => {
      setAccountNumber(e.currentTarget.value);
    }

    const handleCreateCustomer = (e) => {
      e.preventDefault();
      onSubmit(accountNumber);
    }
    return(
        <Col md={12} lg={12}>
      <Card>
        <CardBody>
                <form className="form" onSubmit={handleCreateCustomer}>
                  <Row>
                  <Col lg ="4">
                  <div className="form__form-group">
                        <span className="form__form-group-label required">
                         Customer Account Number
                        </span>
                        <div className="form__form-group-field">
                        <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
                            <input
                            id='account'
                            disabled={true}
                            type='text'
                            value={customer.request || ''}
                            />
                        </div>
                        </div>
                      </div>
                    </Col>
                    <Col lg ="4">
                    <div className="form__form-group">
                        <span className="form__form-group-label required">
                         Customer Account Name
                        </span>
                        <div className="form__form-group-field">
                        <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
                            <input
                            id='name'
                            disabled={true}
                            type='text'
                            value={customer.response.accountName || ''}
                            />
                        </div>
                        </div>
                      </div>
                    </Col>
                    <Col lg ="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                         Core Banking Id
                        </span>
                        <div className="form__form-group-field">
                        <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
                            <input
                            id='cbi'
                            disabled={true}
                            type='text'
                            value={customer.response.coreBankingid || "0909090901"}
                            />
                        </div>
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
                      {createCustomer?.loading ? (
                        <span>
                          <Spinner size="sm" color="default" />{" "}
                        </span>
                      ) : null}
                      Create Customer
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

  }))(CustomerDetails));
