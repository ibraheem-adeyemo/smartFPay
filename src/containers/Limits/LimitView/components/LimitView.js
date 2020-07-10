import React from "react";
import { Col, Card, CardBody, Spinner, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";

const LimitView = props => {
  const { control, controlId, fetchData } = props;
  const foundControl =
    control.response &&
    !control.loading;
  const controlObj =
    control.response
      ? control.response
      : {};

  return (
    <Col>
      <Card>
        <CardBody>
          {foundControl ? (
            <div className="project-summary">
              <div className="card__title">
                <h4 className="bold-text">
                  {controlObj.id}
                </h4>
              </div>
              <AccessControl
                allowedPermissions={[permissionsConstants.UPDATE_CONTROL]}
                renderNoAccess={() => null}
              >
                <Link
                  to={`/limit-requests/edit/${control.response.token}`}
                  className="btn btn-sm btn-outline-secondary project-summary__btn"
                  id="link-edit-control"
                >
                  Edit
                </Link>
              </AccessControl>

              <dl className="row">
                <dt className="col-sm-2">Frequency Limit reset</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.frequencyLimitReset}</p>
                </dd>

                <dt className="col-sm-2">Transaction Limit Count</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.transactionLimitCount}</p>
                </dd>

                <dt className="col-sm-2">Amount</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.transactionLimitAmount}</p>
                </dd>

                <dt className="col-sm-2">Limit Type</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.limitType}</p>
                </dd>
                <dt className="col-sm-2">Card Status</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.cardStatus}</p>
                </dd>
                <dt className="col-sm-2">Limit Start Date</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.limitStartDate}</p>
                </dd>
                <dt className="col-sm-2">Limit End Date</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.limitEndDate}</p>
                </dd>
                <dt className="col-sm-2">Enabled Countries</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.enabledCountries}</p>
                </dd>
                <dt className="col-sm-2">Enabled Channels</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.enabledChannels}</p>
                </dd>
                <dt className="col-sm-2">Account Number</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.accountNumber}</p>
                </dd>
                <dt className="col-sm-2">Created Date</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.createdDate}</p>
                </dd>
                <dt className="col-sm-2">Card Masked Pan</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.cardMaskedPan}</p>
                </dd>
                <dt className="col-sm-2">Card Expiry</dt>
                <dd className="col-sm-10">
                  <p>{controlObj.cardExpiryNumber}</p>
                </dd>
              </dl>
            </div>
          ) : (
            <div className="text-center">
              {control && control.loading ? (
                <div>
                  <Spinner
                    color="success"
                    className="my-4"
                    style={{ width: "6rem", height: "6rem" }}
                  />
                  <h4 className="text-secondary">
                    Fetching limits with accountNumber/cardId ({controlId})
                  </h4>
                </div>
              ) : (
                <div>
                  <h4 className="text-danger">
                    {control.error
                      ? `Something went wrong. Could not fetch limit control with id (${controlId})`
                      : `Limit with id (${controlId}) not found`}
                  </h4>
                  <Button
                    color="primary"
                    id="btn-try-again"
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
          {control && !control.loading ? (
            <h5 className="bold-text mt-4">
              <Link to="/limit-requests" id="link-all-controls">
                <MdArrowBack size={20} /> Back to controls
              </Link>
            </h5>
          ) : null}
        </CardBody>
      </Card>
    </Col>
  );
};

export default LimitView;
