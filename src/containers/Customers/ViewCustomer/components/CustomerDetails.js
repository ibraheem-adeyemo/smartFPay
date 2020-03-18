import React, { memo } from "react";
import { Row, Col } from "reactstrap";

import { appUtils } from "../../../../utils/app.utils";

export default memo(({ customerObject }) => (
  <Row>
    <Col sm="6">
      <h5 className="font-weight-bold">Personal Information</h5>
      <hr className="my-3" />
      <dl className="row">
        {!!customerObject.title && (
          <>
            <dt className="col-sm-4">Title</dt>
            <dd className="col-sm-8">
              <p>{customerObject.title || "---"}</p>
            </dd>
          </>
        )}
        {!!customerObject.firstName && (
          <>
            <dt className="col-sm-4">First Name</dt>
            <dd className="col-sm-8">
              <p>{customerObject.firstName || "---"}</p>
            </dd>
          </>
        )}
        {!!customerObject.middleName && (
          <>
            <dt className="col-sm-4">Middle Name</dt>
            <dd className="col-sm-8">
              <p>{customerObject.middleName || "---"}</p>
            </dd>
          </>
        )}
        {!!customerObject.lastName && (
          <>
            <dt className="col-sm-4">Last Name</dt>
            <dd className="col-sm-8">
              <p>{customerObject.lastName || "---"}</p>
            </dd>
          </>
        )}
        {!!customerObject.dateOfBirth && (
          <>
            <dt className="col-sm-4">Date of Birth</dt>
            <dd className="col-sm-8">
              <p>
                {customerObject.dateOfBirth
                  ? appUtils.formatDOB(customerObject.dateOfBirth)
                  : "---"}
              </p>
            </dd>
          </>
        )}
      </dl>
      <h5 className="font-weight-bold">Contact Information</h5>
      <hr className="my-3" />
      <dl className="row">
        {!!customerObject.emailAddress && (
          <>
            <dt className="col-sm-4">Email</dt>
            <dd className="col-sm-8">
              <p>{customerObject.emailAddress || "---"}</p>
            </dd>
          </>
        )}

        {!!customerObject.mobileNr && (
          <>
            <dt className="col-sm-4">Mobile Number</dt>
            <dd className="col-sm-8">
              <p>{customerObject.mobileNr || "---"}</p>
            </dd>
          </>
        )}
        {!!customerObject.streetAddress && (
          <>
            <dt className="col-sm-4">Address</dt>
            <dd className="col-sm-8">
              <p>
                {customerObject.streetAddress}
                {!!customerObject.streetAddressLine2 && <br />}
                {customerObject.streetAddressLine2}
                {!!customerObject.postalCode && <br />}
                {customerObject.postalCode}
              </p>
            </dd>
          </>
        )}
        {!!customerObject.city && (
          <>
            <dt className="col-sm-4">City</dt>
            <dd className="col-sm-8">
              <p>{customerObject.city || "---"}</p>
            </dd>
          </>
        )}
        {!!customerObject.state && (
          <>
            <dt className="col-sm-4">State</dt>
            <dd className="col-sm-8">
              <p>{customerObject.state || "---"}</p>
            </dd>
          </>
        )}
        {!!customerObject.countryCode && (
          <>
            <dt className="col-sm-4">Country</dt>
            <dd className="col-sm-8">
              <p>{customerObject.countryCode || "---"}</p>
            </dd>
          </>
        )}
      </dl>
    </Col>

    <Col sm="6">
      <h5 className="font-weight-bold">Card Information</h5>
      <hr className="my-3" />
      <dl className="row">
        {!!customerObject.nameOnCard && (
          <>
            <dt className="col-sm-5">Name on Card</dt>
            <dd className="col-sm-7">
              <p>{customerObject.nameOnCard || "---"}</p>
            </dd>
          </>
        )}
        {!!customerObject.issuerName && (
          <>
            <dt className="col-sm-5">Issuer Name</dt>
            <dd className="col-sm-7">
              <p>{customerObject.issuerName || "---"}</p>
            </dd>
          </>
        )}
        {!!customerObject.cardStatus && (
          <>
            <dt className="col-sm-5">Card Status</dt>
            <dd className="col-sm-7">
              <p>{customerObject.cardStatus || "---"}</p>
            </dd>
          </>
        )}
      </dl>
    </Col>
  </Row>
));
