import React from "react";
import { Col, Card, CardBody, Spinner, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack, MdAutorenew } from "react-icons/md";
import { withRouter } from "react-router-dom";
import CustomerDetails from "./CustomerDetails";

const CustomerView = props => {
  const { customer, fetchData, location, isModal } = props;
  const foundRequest = customer.response;
  const customerObject =
    customer.response && customer.response.data && customer.response.data.length
      ? customer.response.data[0]
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
                  id="btn-refresh-customer"
                  size="sm"
                  onClick={fetchData}
                >
                  {customer.loading ? (
                    <Spinner size="sm" />
                  ) : (
                    <span>
                      <MdAutorenew size={20} /> Refresh
                    </span>
                  )}
                </Button>
              )}

              <CustomerDetails customerObject={customerObject} />
            </div>
          ) : (
            <div className="text-center">
              {customer && customer.loading ? (
                <div>
                  <Spinner
                    color="success"
                    className="my-4"
                    style={{ width: "6rem", height: "6rem" }}
                  />
                  <h4 className="text-secondary">Fetching customer</h4>
                </div>
              ) : (
                <div>
                  <h4 className="text-danger">
                    {customer.error
                      ? `Something went wrong. Could not fetch customer`
                      : `Customer not found`}
                  </h4>
                  <Button
                    color="primary"
                    id="btn-fetch-customer"
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
          {customer && !customer.loading && !isModal ? (
            <h5 className="bold-text mt-4">
              <Link
                to={{
                  pathname:
                    location.state && location.state.batchInfo
                      ? `/card-requests/${location.state.batchInfo.id}/customers`
                      : "/customers",
                  state: {
                    batchInfo: !!location.state && location.state.batchInfo
                  }
                }}
                id="link-all-customers"
              >
                <MdArrowBack size={20} /> Back to customers
              </Link>
            </h5>
          ) : null}
        </CardBody>
      </Card>
    </Col>
  );
};

export default withRouter(CustomerView);
