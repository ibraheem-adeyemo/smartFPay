import React from "react";
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";
import { MdRefresh } from "react-icons/md";
import { getAllCardRequests } from "../../CardRequests/actions/cardrequests.actions";

const StatsCard = ({ dispatch, requests, bigText, smallText, data }) => {

  function fetchRequests() {
    dispatch(getAllCardRequests());
  }

  return (
    <Card>
      <CardBody
        className={`dashboard__booking-card ${
          requests && requests.error ? "card-muted" : ""
        }`}
      >
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--green">
            <span
              className={`${requests && requests.error ? "text-muted" : ""}`}
            >
              {data}
            </span>
          </h5>
          <MdRefresh
            className={`dashboard__trend-icon pointer  ${
              requests && requests.loading ? "spin" : ""
            } `}
            onClick={fetchRequests}
          />
        </div>
        <h4 className="dashboard__booking-total-description">
          {bigText}
          <br />
          <small>{smallText}</small>
        </h4>
      </CardBody>
    </Card>
  );
};

export default connect(state => ({
  requests: state.getAllCardRequests
}))(StatsCard);
