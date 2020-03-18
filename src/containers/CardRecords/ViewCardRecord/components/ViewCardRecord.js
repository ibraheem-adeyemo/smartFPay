import React from "react";
import { Col, Card, CardBody, Spinner, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack, MdAutorenew } from "react-icons/md";
import { withRouter } from "react-router-dom";

import CardDetails from "./CardDetails";

const CardRecordView = ({
  cardRecord,
  fetchData,
  location,
  isModal
}) => {
  const foundRequest = cardRecord.response;
  const cardRecordObject =
    cardRecord.response &&
    cardRecord.response.data &&
    cardRecord.response.data.length
      ? cardRecord.response.data[0]
      : {};

  return (
    <Col>
      <Card>
        <CardBody className={!!isModal && "p-0"}>
          {foundRequest ? (
            <div className="project-summary">
              {!isModal && (
                <Button
                  className="btn btn-sm btn-outline-secondary project-summary__btn"
                  outline
                  id="btn-refresh-cardrequests"
                  size="sm"
                  onClick={fetchData}
                >
                  {cardRecord.loading ? (
                    <Spinner size="sm" />
                  ) : (
                    <span>
                      <MdAutorenew size={20} /> Refresh
                    </span>
                  )}
                </Button>
              )}
              <CardDetails cardRecordObject={cardRecordObject} />
            </div>
          ) : (
            <div className="text-center">
              {cardRecord && cardRecord.loading ? (
                <div>
                  <Spinner
                    color="success"
                    className="my-4"
                    style={{ width: "6rem", height: "6rem" }}
                  />
                  <h4 className="text-secondary">Fetching card record</h4>
                </div>
              ) : (
                <div>
                  <h4 className="text-danger">
                    {cardRecord.error
                      ? `Something went wrong. Could not fetch card record`
                      : `Card record not found`}
                  </h4>
                  <Button
                    color="primary"
                    id="btn-fetch-cardRecord"
                    outline
                    size="sm"
                    onClick={fetchData}
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          )}
          {cardRecord && !cardRecord.loading && !isModal ? (
            <h5 className="bold-text mt-4">
              <Link
                to={{
                  pathname:
                    location.state && location.state.customerInfo
                      ? `/customers/${location.state.customerInfo.id}/cards`
                      : "/cards",
                  state: {
                    customerInfo:
                      !!location.state && location.state.customerInfo
                  }
                }}
                id="link-all-cardRecord"
              >
                <MdArrowBack size={20} /> Back to card records
              </Link>
            </h5>
          ) : null}
        </CardBody>
      </Card>
    </Col>
  );
};

export default withRouter(CardRecordView);
