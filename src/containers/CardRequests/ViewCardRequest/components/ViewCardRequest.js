import React from "react";
import { Col, Card, CardBody, Spinner, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack, MdAutorenew } from "react-icons/md";

const CardRequestView = props => {
  const { cardRequest, cardRequestId, fetchData } = props;
  const foundRequest = cardRequest.response;
  const cardRequestObject = cardRequest.response || {};

  return (
    <Col>
      <Card>
        <CardBody>
          {foundRequest ? (
            <div className="project-summary">
              <Button
                className="btn btn-sm btn-outline-secondary project-summary__btn"
                outline
                id="btn-refresh-cardrequests"
                size="sm"
                onClick={fetchData}
              >
                {cardRequest.loading ? (
                  <Spinner size="sm" />
                ) : (
                  <span>
                    <MdAutorenew size={20} /> Refresh
                  </span>
                )}
              </Button>
              <dl className="row">
              <dt className="col-sm-2">Status Message</dt>
                <dd className="col-sm-10">
                  <p>{cardRequestObject.responseMessage || "---"}</p>
                </dd>
                
                <dt className="col-sm-2">Card Request Id</dt>
                <dd className="col-sm-10">
                  <p>{cardRequestObject.id || "---"}</p>
                </dd>

                <dt className="col-sm-2">Configuration Name</dt>
                <dd className="col-sm-10">
                  <p>{cardRequestObject.configName || "---"}</p>
                </dd>

                <dt className="col-sm-2">Number of cards requested</dt>
                <dd className="col-sm-10">
                  <p>{cardRequestObject.count || "---"}</p>
                </dd>

                <dt className="col-sm-2">Batch Id</dt>
                <dd className="col-sm-10">
                  <p>{cardRequestObject.batchId || "---"}</p>
                </dd>

                <dt className="col-sm-2">Job number</dt>
                <dd className="col-sm-10">
                  <p>{cardRequestObject.jobNo || "---"}</p>
                </dd>

                <dt className="col-sm-2">Status</dt>
                <dd className="col-sm-10">
                  <p className="font-weight-bold">
                    {cardRequestObject.status || "---"}
                  </p>
                </dd>

                <dt className="col-sm-2">Prepared Count</dt>
                <dd className="col-sm-10">
                  <p>{cardRequestObject.preparedCount || "---"}</p>
                </dd>

                <dt className="col-sm-2">Prepared Date</dt>
                <dd className="col-sm-10">
                  <p>
                    {(cardRequestObject.preparedDate &&
                      new Date(cardRequestObject.preparedDate).toLocaleString()) ||
                      "---"}
                  </p>
                </dd>

                <dt className="col-sm-2">Created By</dt>
                <dd className="col-sm-10">
                  <p>{cardRequestObject.createdBy || "---"}</p>
                </dd>

                <dt className="col-sm-2">Created On</dt>
                <dd className="col-sm-10">
                  <p>
                    {(cardRequestObject.creationDate &&
                      new Date(cardRequestObject.creationDate).toLocaleString()) ||
                      "---"}
                  </p>
                </dd>

                <dt className="col-sm-2">Auto Upload Status</dt>
                <dd className="col-sm-10">
                  <p>{cardRequestObject.autoUploadStatus || "---"}</p>
                </dd>
              </dl>
            </div>
          ) : (
            <div className="text-center">
              {cardRequest && cardRequest.loading ? (
                <div>
                  <Spinner
                    color="success"
                    className="my-4"
                    style={{ width: "6rem", height: "6rem" }}
                  />
                  <h4 className="text-secondary">
                    Fetching card request
                  </h4>
                </div>
              ) : (
                <div>
                  <h4 className="text-danger">
                    {cardRequest.error
                      ? `Something went wrong. Could not fetch card request with id (${cardRequestId})`
                      : `Card request with id (${cardRequestId}) not found`}
                  </h4>
                  <Button color="primary" id="btn-fetch-cardrequest" outline size="sm" onClick={fetchData}>
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          )}
          {cardRequest && !cardRequest.loading ? (
            <h5 className="bold-text mt-4">
              <Link to="/card-requests" id="link-all-cardrequests">
                <MdArrowBack size={20} /> Back to card requests
              </Link>
            </h5>
          ) : null}
        </CardBody>
      </Card>
    </Col>
  );
};

export default CardRequestView;
