import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";
import { MdRefresh } from "react-icons/md";
import { getCustomers } from "../../Customers/actions/customers.actions";

const CustomersCard = ({ dispatch, customers }) => {
  function fetchRequests() {
    dispatch(getCustomers({ page: 1, pageSize: 2 }));
  }

  useEffect(() => {
    dispatch(getCustomers({ page: 1, pageSize: 2 }));
  }, [dispatch]);

  return (
    <Card>
      <CardBody
        className={`dashboard__booking-card ${
          customers && customers.error ? "card-muted" : ""
        }`}
      >
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--red">
            <span
              className={`${customers && customers.error ? "text-muted" : ""}`}
            >
              {customers && customers.response ? customers.response.count : 0}
            </span>
          </h5>
          <MdRefresh
            className={`dashboard__trend-icon pointer  ${
              customers && customers.loading ? "spin" : ""
            } `}
            onClick={fetchRequests}
          />
        </div>
        <h4 className="dashboard__booking-total-description">
          Customers
          <br />
          <small>Number of bank customers</small>
        </h4>
      </CardBody>
    </Card>
  );
};

export default connect(state => ({
  customers: state.getCustomers
}))(CustomersCard);
