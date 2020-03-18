import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { appUtils } from "../../../../../../utils/app.utils";

const CustomerInformationReview = ({ values }) => {
  return (
    <Card>
      <CardBody className="p-0">
        <div className="project-summary">
          <h4>
            <strong>Request Type:</strong>{" "}
            {values.cardRequestType ? values.cardRequestType.label : ""}
          </h4>
          {values.cardRequestType &&
          values.cardRequestType.value === "single" ? (
            <Row className="my-2">
              <Col sm="6">
                <h5 className="font-weight-bold">Personal Information</h5>
                <hr className="my-3" />
                <dl className="row">
                  <dt className="col-sm-5">Title</dt>
                  <dd className="col-sm-7">
                    <p>{(values.title && values.title.name) || "---"}</p>
                  </dd>

                  <dt className="col-sm-5">First Name</dt>
                  <dd className="col-sm-7">
                    <p>{values.firstName || "---"}</p>
                  </dd>

                  <dt className="col-sm-5">Last Name</dt>
                  <dd className="col-sm-7">
                    <p>{values.lastName || "---"}</p>
                  </dd>

                  <dt className="col-sm-5">Date of Birth</dt>
                  <dd className="col-sm-7">
                    <p>
                      {new Date(values.dateOfBirth).toLocaleDateString() ||
                        "---"}
                    </p>
                  </dd>
                </dl>

                <h5 className="font-weight-bold">Contact Information</h5>
                <hr className="my-3" />
                <dl className="row">
                  <dt className="col-sm-5">Email Address</dt>
                  <dd className="col-sm-7">
                    <p>{values.emailAddress || "---"}</p>
                  </dd>

                  <dt className="col-sm-5">Mobile Number</dt>
                  <dd className="col-sm-7">
                    <p>{values.mobileNo || "---"}</p>
                  </dd>

                  <dt className="col-sm-5">Full Address</dt>
                  <dd className="col-sm-7">
                    <p>{values.addressLine1 || "---"}</p>
                    <p>{values.addressLine2 || "---"}</p>
                    <p>{values.addressCity || "---"}</p>
                    <p>{values.addressState || "---"}</p>
                    <p>
                      {(values.addressCountry && values.addressCountry.name) ||
                        "---"}
                    </p>
                  </dd>
                </dl>
              </Col>
              <Col sm="6">
                <h5 className="font-weight-bold">Account Information</h5>
                <hr className="my-3" />
                <dl className="row">
                  <dt className="col-sm-5">Identification Number</dt>
                  <dd className="col-sm-7">
                    <p>{values.identificationNo || "---"}</p>
                  </dd>

                  <dt className="col-sm-5">Enrollment Number</dt>
                  <dd className="col-sm-7">
                    <p>{values.enrollmentNo || "---"}</p>
                  </dd>

                  <dt className="col-sm-5">Account Type</dt>
                  <dd className="col-sm-7">
                    <p>
                      {(values.accountType && values.accountType.label) ||
                        "---"}
                    </p>
                  </dd>
                </dl>

                <h5 className="font-weight-bold">Card Information</h5>
                <hr className="my-3" />
                <dl className="row">
                  <dt className="col-sm-5">Name on Card</dt>
                  <dd className="col-sm-7">
                    <p>
                      {(values.nameOnCard && values.nameOnCard.toUpperCase()) ||
                        "---"}
                    </p>
                  </dd>

                  <dt className="col-sm-5">Pin Generation Method</dt>
                  <dd className="col-sm-7">
                    <p>{values.lostOrStolen ? "Yes" : "No"}</p>
                  </dd>
                </dl>
              </Col>
            </Row>
          ) : (
            <Row className="my-2">
              <Col lg="12">
                <h5 className="mb-2"> 
                  <strong>File Name:</strong>{" "}
                  {(values.excelFile && values.excelFile.name) ||
                    "No file uploaded"}
                </h5>
                {values.excelFile && values.excelFile.file ? (
                  <div>
                    <p>
                      <strong>Size:</strong>{" "}
                      {appUtils.byteConverter(values.excelFile.file.size)}
                    </p>
                    <p>
                      <strong>Last Modified:</strong>{" "}
                      {new Date(
                        values.excelFile.file.lastModifiedDate
                      ).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  "No file details found"
                )}
              </Col>
            </Row>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default CustomerInformationReview;
