import React, {useState, useEffect} from "react";
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
import { MdArrowBack } from "react-icons/md";
import { Field, reduxForm, formValueSelector } from "redux-form";
import {customersService} from "../../services/customers.service";

const CustomerDetails = ({createCustomer, customer, submitting, onSubmit,invalid, handleNextPage, previous}) => {
  const {getCustomers} = customersService;
    const [accountNumber, setAccountNumber] = useState('');
    const {response} = customer;
    let data = response?.data?.[0];

    // useEffect(() => {
    //   getCustomers({pageSize:10, pageNumber:1 ,accountNumber: customer?.request}).then(res => {
    //     console.log(res);
    //     setCustomerExists(res?.count > 0)
    //   });
    // }, []);

    const handleCreateCustomer = (e) => {
      e.preventDefault();
      onSubmit(accountNumber);
    }
    return(
        <Col md={12} lg={12}>
      <Card>
        <CardBody>
                <form className="form">
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
                            value={data?.accountNumber || ''}
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
                            value={data?.name || ''}
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
                            value={data?.coreBankingId || ""}
                            />
                        </div>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <ButtonToolbar className="form__button-toolbar">
                  <Button
                      color="secondary"
                      id="submit-btn"
                      type="submit"
                      disabled={submitting || invalid}
                      onClick={previous}
                    >
                      <MdArrowBack size={20} />
                      {createCustomer?.loading ? (
                        <span>
                          <Spinner size="sm" color="default" />{" "}
                        </span>
                      ) : null}
                      Customer Account Form
                    </Button>
                  {response.count > 0?<Button
                      color="primary"
                      id="submit-btn"
                      type="submit"
                      disabled={submitting || invalid}
                      onClick={handleNextPage}
                    >
                      {createCustomer?.loading ? (
                        <span>
                          <Spinner size="sm" color="default" />{" "}
                        </span>
                      ) : null}
                      Manage Controls
                    </Button>:
                    <Button
                      color="primary"
                      id="submit-btn"
                      type="submit"
                      disabled={submitting || invalid}
                      onClick={handleCreateCustomer}
                    >
                      {createCustomer?.loading ? (
                        <span>
                          <Spinner size="sm" color="default" />{" "}
                        </span>
                      ) : null}
                      Create Customer
                    </Button>}
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