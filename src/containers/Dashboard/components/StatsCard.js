import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";
import { MdRefresh } from "react-icons/md";
import { getAllCardRequests } from "../../CardRequests/actions/cardrequests.actions";

const StatsCard = ({ dispatch, requests, bigText, smallText }) => {

  function fetchRequests() {
    dispatch(getAllCardRequests({ page: 1, pageSize: 10 }));
  }

  useEffect(() => {
    dispatch(getAllCardRequests({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  return (
    <Card>
      <CardBody
        className={`dashboard__booking-card ${
          requests && requests.error ? "card-muted" : ""
        }`}
      >
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--red">
            <span
              className={`${requests && requests.error ? "text-muted" : ""}`}
            >
              100
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
