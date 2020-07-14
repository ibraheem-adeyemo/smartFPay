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
        {control && !control.loading ? (<div className="card__title">
            <h5 className="bold-text">
            <Link to="/limit-requests" id="link-all-controls">
                <MdArrowBack size={20} /> Back to controls
              </Link>
            </h5>
          </div>):null}
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

              <dl className="row" style={{fontSize: '18px'}}>
                <dt className="col-sm-4">Account Number</dt>
                <dd className="col-sm-8">
                  <p>{controlObj.accountNumber}</p>
                </dd>
                <dt className="col-sm-4">Limit Type</dt>
                <dd className="col-sm-8">
                  <p>{controlObj.limitType}</p>
                </dd>
                <dt className="col-sm-4">Amount</dt>
                <dd className="col-sm-8">
                  <p>{controlObj.transactionLimitAmount}</p>
                </dd>
                <dt className="col-sm-4">Frequency Limit reset</dt>
                <dd className="col-sm-8">
                  <p>{controlObj.frequencyLimitReset}</p>
                </dd>

                <dt className="col-sm-4">Transaction Limit Count</dt>
                <dd className="col-sm-8">
                  <p>{controlObj.transactionLimitCount}</p>
                </dd>

                {controlObj.limitType === "CARD" && 
                <>
                  <dt className="col-sm-4">Card Status</dt>
                  <dd className="col-sm-8">
                    <p>{controlObj.cardStatus}</p>
                  </dd>
                  <dt className="col-sm-4">Card Masked Pan</dt>
                  <dd className="col-sm-8">
                    <p>{controlObj.cardMaskedPan}</p>
                  </dd>
                  <dt className="col-sm-4">Card Expiry</dt>
                  <dd className="col-sm-8">
                    <p>{controlObj.cardExpiryNumber}</p>
                  </dd>
                  <dt className="col-sm-4">Enabled Countries</dt>
                  <dd className="col-sm-8">
                    <p>{controlObj.enabledCountries}</p>
                  </dd>
                  <dt className="col-sm-4">Enabled Channels</dt>
                  <dd className="col-sm-8">
                    <p>{controlObj.enabledChannels}</p>
                  </dd>
                  </>
                }
                <dt className="col-sm-4">Limit Start Date</dt>
                <dd className="col-sm-8">
                  <p>{controlObj.limitStartDate || 'No start date provided'}</p>
                </dd>
                <dt className="col-sm-4">Limit End Date</dt>
                <dd className="col-sm-8">
                  <p>{controlObj.limitEndDate || 'No end date provided'}</p>
                </dd>
                <dt className="col-sm-4">Created Date</dt>
                <dd className="col-sm-8">
                  <p>{controlObj.createdDate}</p>
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
          {/* {control && !control.loading ? (
            <h5 className="bold-text mt-4">
              <Link to="/limit-requests" id="link-all-controls">
                <MdArrowBack size={20} /> Back to controls
              </Link>
            </h5>
          ) : null} */}
        </CardBody>
      </Card>
    </Col>
  );
};

export default LimitView;
