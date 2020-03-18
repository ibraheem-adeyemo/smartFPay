import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";
import { MdRefresh } from "react-icons/md";
import { getCardProgramCount } from "../actions/dashboard.actions";

const CardProgramCard = ({ dispatch, cardProgramCount, assignedIssuer }) => {
  function fetchCount() {
    if (assignedIssuer && assignedIssuer.issuerCode) {
      dispatch(getCardProgramCount(assignedIssuer));
    }
  }

  useEffect(() => {
    if (assignedIssuer && assignedIssuer.issuerCode) {
      dispatch(getCardProgramCount(assignedIssuer));
    }
  }, [dispatch, assignedIssuer]);

  return (
    <Card>
      <CardBody
        className={`dashboard__booking-card ${
          cardProgramCount && cardProgramCount.error ? "card-muted" : ""
        }`}
      >
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--red">
            <span
              className={`${
                cardProgramCount && cardProgramCount.error ? "text-muted" : ""
              }`}
            >
              {cardProgramCount &&
              cardProgramCount.response &&
              cardProgramCount.response.data &&
              cardProgramCount.response.data.length
                ? cardProgramCount.response.data[0]
                : 0}
            </span>
          </h5>
          <MdRefresh
            className={`dashboard__trend-icon pointer  ${
              cardProgramCount && cardProgramCount.loading ? "spin" : ""
            } `}
            onClick={fetchCount}
          />
        </div>
        <h4 className="dashboard__booking-total-description">
          Card Programs
          <br />
          <small>Number of active programs</small>
        </h4>
      </CardBody>
    </Card>
  );
};

export default connect(state => ({
  cardProgramCount: state.cardProgramCount,
  assignedIssuer:
    state.getIssuerDomainMapping &&
    state.getIssuerDomainMapping.response &&
    state.getIssuerDomainMapping.response.data
      ? state.getIssuerDomainMapping.response.data[0]
      : []
}))(CardProgramCard);
