import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, UncontrolledAlert } from "reactstrap";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomerDetails,resetPost, postCustomer, getCustomers } from "../../actions/customers.actions";
import {getControl} from '../../../Limits/actions/limits.actions';
import { show as showAlert } from "../../../Notifications/actions/alert.actions";
import CustomerAccountInformation from "../CustomerSteps/CustomerAccountInformation";
import CustomerDetails from '../CustomerSteps/CustomerDetails';
import CustomerView from '../CustomerSteps/CustomerView';
// import CardConfiguration from "./CardSteps/CardConfiguration";
// import Review from "./CardSteps/Review";
import { CARD_REQUEST_TYPE } from "../../../../constants/app.constants";
import FormError from "../../../../shared/components/FormError";
import { getAllControls } from "../../../Limits/actions/limits.actions";

const CustomerCreateForm = ({ dispatch, onSubmit, history, customer, customers, controls, control, location }) => {
  const [page, setPage] = useState(1);
  const [account, setAccount] = useState(null);
  let cardControls = [], accountControls = [];
  let accountNumber = '';

  const nextPage = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() =>
  {
    if (window.location.pathname.includes("/edit"))
    {
      const accNumber = window.location.pathname.split("/").pop();
      if (!Number(accNumber))
        return history.push("/customers")

      getCustomer(accNumber, () => setPage(3));
    }
    else
      history.push("/customers");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createCustomer = (customer) => {
    let requestBody = {
      accountNumber: customer.request,
      name: customer.response.accountName,
      coreBankingId: customer.response.coreBankingId || '0909090901'
    }
    dispatch(postCustomer(requestBody, nextPage));
    // nextPage();
  }

  const getCustomer = (accountNumber, callBack = nextPage) => {
    setAccount(accountNumber);
    dispatch(getCustomers({accountNumber, pageNumber:1, pageSize: 10}))
    dispatch(getAllControls({accountNumber,pageNumber:1, pageSize: 1000}))
    dispatch(getCustomerDetails(accountNumber, callBack));
    // setAccount(accountNumber);
    // nextPage();
  }

  const getLimitByToken = (token) => {
    // dispatch(getControl(token));
  }

  const fetchControls = (accountNumber) => {
    
    setAccount(accountNumber);
    nextPage();
  }

  // console.log(count, data)

  const previousPage = () => {
    setPage(prev => prev - 1);
  };

  const startFlow = () => {
    setPage(1);
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">
              <Link to="/customers" id="link-all-cardrequests">
                <MdArrowBack size={20} /> Back to Customers
              </Link>
            </h5>
          </div>
          <FormError />
          <div className="wizard">
            <div className="wizard__steps">
              <div
                className={`wizard__step${
                  page === 1 ? " wizard__step--active" : ""
                }`}
              >
                <p>Customer Account Form</p>
              </div>
              <div
                className={`wizard__step${
                  page === 2 ? " wizard__step--active" : ""
                }`}
              >
                <p>Customer Details</p>
              </div>
              <div
                className={`wizard__step${
                  page === 3 ? " wizard__step--active" : ""
                }`}
              >
                <p>Limit Control</p>
              </div>
            </div>
            <div className="wizard__form-wrapper">
              {page === 1 && (
                <CustomerAccountInformation
                  onSubmit={getCustomer}
                  customer={customer}
                />
              )}
              {page === 2 && (
                <CustomerDetails
                account={account}
                  previousPage={previousPage}
                  handleNextPage={nextPage}
                  previous={previousPage}
                  onSubmit={() => createCustomer(customer)}
                />
              )}
              {page === 3 && (
                <CustomerView
                  customer={customer}
                  previous={previousPage}
                  startFlow={startFlow}
                  getControl={getLimitByToken}
                  accountNumber={accountNumber}
                  control={control}
                  controls={controls}
                  location={location}
                  dispatch={dispatch}
              />
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

CustomerCreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default connect(state => ({
  createCustomer: state.createCustomercreateCustomer,
  customer: state.getCustomer,
  customers: state.getCustomers,
  controls: state.getcontrols,
  control: state.viewcontrol
}))(CustomerCreateForm);
