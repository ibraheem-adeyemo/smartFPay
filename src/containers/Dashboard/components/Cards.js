import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";
import { MdRefresh } from "react-icons/md";
import { getCardRecords } from "../../CardRecords/actions/cardRecords.actions";

const CardsCard = ({ dispatch, cards }) => {
  function fetchRequests() {
    dispatch(getCardRecords({ page: 1, pageSize: 2 }));
  }

  useEffect(() => {
    dispatch(getCardRecords({ page: 1, pageSize: 2 }));
  }, [dispatch]);

  return (
    <Card>
      <CardBody
        className={`dashboard__booking-card ${
          cards && cards.error ? "card-muted" : ""
        }`}
      >
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--red">
            <span
              className={`${cards && cards.error ? "text-muted" : ""}`}
            >
              {cards && cards.response ? cards.response.count : 0}
            </span>
          </h5>
          <MdRefresh
            className={`dashboard__trend-icon pointer  ${
              cards && cards.loading ? "spin" : ""
            } `}
            onClick={fetchRequests}
          />
        </div>
        <h4 className="dashboard__booking-total-description">
          Card Records
          <br />
          <small>Number of cards processed</small>
        </h4>
      </CardBody>
    </Card>
  );
};

export default connect(state => ({
  cards: state.getCardRecords
}))(CardsCard);
