import React from "react";
import { Row, Col } from "reactstrap";
import { Field } from "redux-form";
import { renderField } from "../../../../../../utils/renderfield";
import renderDatePickerField from "../../../../../../shared/components/form/DatePicker";
import renderSelectField from "../../../../../../shared/components/form/Select";
import { COUNTRIES } from "../../../../../../constants/countries";
import {
  TITLE,
  ACCOUNT_TYPES
} from "../../../../../../constants/app.constants";

const SingleCardRequest = () => {
  return (
    <div id="single-card-request">
      <h5 className="font-weight-bold">Personal Information</h5>
      <hr className="my-3" />
      <Row>
        <Col lg="3">
          <div className="form__form-group">
            <span className="form__form-group-label required">Title</span>
            <div className="form__form-group-field">
              <Field
                id="title"
                name="title"
                component={renderSelectField}
                options={TITLE}
                valueKey="value"
                labelKey="name"
              />
            </div>
          </div>
        </Col>
        <Col lg="3">
          <div className="form__form-group">
            <span className="form__form-group-label required">First name</span>
            <div className="form__form-group-field">
              <Field
                id="firstName"
                name="firstName"
                component={renderField}
                type="text"
                placeholder="first name"
              />
            </div>
          </div>
        </Col>
        <Col lg="3">
          <div className="form__form-group">
            <span className="form__form-group-label required">Last name</span>
            <div className="form__form-group-field">
              <Field
                id="lastName"
                name="lastName"
                component={renderField}
                type="text"
                placeholder="Last name"
              />
            </div>
          </div>
        </Col>
        <Col lg="3">
          <div className="form__form-group">
            <span className="form__form-group-label required">
              Date of Birth
            </span>
            <div className="form__form-group-field">
              <Field
                id="dateOfBirth"
                name="dateOfBirth"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                component={renderDatePickerField}
                placeholder="Date of Birth"
              />
            </div>
          </div>
        </Col>
      </Row>
      <h5 className="font-weight-bold">Contact Information</h5>
      <hr className="my-3" />
      <Row>
        <Col lg="4">
          <div className="form__form-group">
            <span className="form__form-group-label required">
              Email address
            </span>
            <div className="form__form-group-field">
              <Field
                id="emailAddress"
                name="emailAddress"
                component={renderField}
                type="email"
                placeholder="email address"
              />
            </div>
          </div>
        </Col>
        <Col lg="4">
          <Row>
            <Col lg="4">
              <div className="form__form-group">
                <span className="form__form-group-label required">
                  Country Code
                </span>
                <div className="form__form-group-field">
                  <Field
                    id="countryCode"
                    name="countryCode"
                    component={renderField}
                    type="tel"
                    placeholder="Code (+234)"
                  />
                </div>
              </div>
            </Col>
            <Col lg="8">
              <div className="form__form-group">
                <span className="form__form-group-label required">
                  Mobile number
                </span>
                <div className="form__form-group-field">
                  <Field
                    id="mobileNo"
                    name="mobileNo"
                    component={renderField}
                    type="tel"
                    placeholder="Mobile number"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <div className="form__form-group">
            <span className="form__form-group-label required">
              Address line 1
            </span>
            <div className="form__form-group-field">
              <Field
                id="addressLine1"
                name="addressLine1"
                component={renderField}
                type="text"
                placeholder="Address line 1"
              />
            </div>
          </div>
        </Col>
        <Col lg="4">
          <div className="form__form-group">
            <span className="form__form-group-label">Address line 2</span>
            <div className="form__form-group-field">
              <Field
                id="addressLine2"
                name="addressLine2"
                component={renderField}
                type="text"
                placeholder="Address line 2"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <div className="form__form-group">
            <span className="form__form-group-label required">City</span>
            <div className="form__form-group-field">
              <Field
                id="addressCity"
                name="addressCity"
                component={renderField}
                type="text"
                placeholder="Address City"
              />
            </div>
          </div>
        </Col>
        <Col lg="4">
          <div className="form__form-group">
            <span className="form__form-group-label required">State</span>
            <div className="form__form-group-field">
              <Field
                id="addressState"
                name="addressState"
                component={renderField}
                type="text"
                placeholder="Address State"
              />
            </div>
          </div>
        </Col>
        <Col lg="4">
          <div className="form__form-group">
            <span className="form__form-group-label required">Country</span>
            <div className="form__form-group-field">
              <Field
                id="addressCountry"
                name="addressCountry"
                component={renderSelectField}
                options={COUNTRIES}
                valueKey="alpha3Code"
                labelKey="name"
              />
            </div>
          </div>
        </Col>
      </Row>
      <h5 className="font-weight-bold">Account Information</h5>
      <hr className="my-3" />
      <Row>
        <Col lg="4">
          <div className="form__form-group">
            <span className="form__form-group-label required">
              Identification Number
            </span>
            <div className="form__form-group-field">
              <Field
                id="identificationNo"
                name="identificationNo"
                component={renderField}
                type="text"
                placeholder="Identification Number"
              />
            </div>
          </div>
        </Col>
        <Col lg="4">
          <div className="form__form-group">
            <span className="form__form-group-label required">
              Enrollment Number
            </span>
            <div className="form__form-group-field">
              <Field
                id="enrollmentNo"
                name="enrollmentNo"
                component={renderField}
                type="text"
                placeholder="Enrollment Number"
              />
            </div>
          </div>
        </Col>
        <Col lg="4">
          <div className="form__form-group">
            <span className="form__form-group-label required">
              Account Type
            </span>
            <div className="form__form-group-field">
              <Field
                id="accountType"
                name="accountType"
                component={renderSelectField}
                options={ACCOUNT_TYPES}
                valueKey="value"
                labelKey="label"
              />
            </div>
          </div>
        </Col>
      </Row>
      <h5 className="font-weight-bold">Card Information</h5>
      <hr className="my-3" />
      <Row>
        <Col lg="4">
          <div className="form__form-group">
            <span className="form__form-group-label required">
              Name on Card
            </span>
            <div className="form__form-group-field">
              <Field
                id="nameOnCard"
                name="nameOnCard"
                component={renderField}
                type="text"
                placeholder="Name on Card"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SingleCardRequest;
