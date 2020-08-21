import React from "react";
import { Field, reduxForm } from "redux-form";
import { MdSearch } from "react-icons/md";
import { Row, Col, Button } from "reactstrap";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import renderSelectField from "../../../../shared/components/form/Select";
import { CHANNELS_OPTIONS } from "../../../../constants/app.constants";
import { COUNTRIES } from "../../../../constants/countries";
import { renderField } from "../../../../utils/renderfield";
import validate from './validate';

const CustomFilter = props => {
  return (
    <Row style={{paddingRight: "1rem", paddingLeft: "1rem"}}>
      {/* <Col> */}
        <form className="form" onSubmit={props.handleSubmit}>
            <Row>
                <Col lg="3">
          <div className="form__form-group">
          <div className="form__form-group-field">
                          <Field
                            id="accountNumber"
                            name="accountNumber"
                            component={renderField}
                            type="text"
                            placeholder="Account Number"
                          />
            {/* <div className="form__form-group-field">
              <Field
                name="pageNumber"
                component="div"
              />
              <Field
                name="pageSize"
                component="div"
              />
              <Field
                name="accountNumber"
                component="input"
                placeholder="Account Number"
              />
              </div> */}
              </div>
              </div>
              </Col>
              <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
            <Field
                            id="accountName"
                            name="accountName"
                            component={renderField}
                            type="text"
                            placeholder="Account Name"
                          />
              {/* <button type="submit" className={`form__form-group-button`}>
                <MdSearch />
              </button> */}
            </div>
          </div></Col>
          <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
          <Field
                            id="startDate"
                            name="startDate"
                            dateFormat="dd-MM-yyyy h:mm:ss"
                            minDate={new Date()}
                            timeFormat="HH:mm"
                            showTimeInput={true}
                            component={renderDatePickerField}
                            placeholder="Start Date"
                            timeInputLabel="Start Time"
                          />
                          </div>
                          </div>
          </Col>
          <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
          <Field
                            id="endDate"
                            name="endDate"
                            dateFormat="dd-MM-yyyy h:mm:ss"
                            minDate={new Date()}
                            timeFormat="HH:mm"
                            showTimeInput={true}
                            component={renderDatePickerField}
                            placeholder="End Date"
                            timeInputLabel="End Time"
                            required
                          />
                          </div>
                          </div>
          </Col>
          <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
            <Field
                            id="enabledCountry"
                            name="enabledCountry"
                            placeholder="Enabled Country"
                            component={renderSelectField}
                            options={COUNTRIES}
                            valueKey="alpha3Code"
                            labelKey="name"
                          />
                          </div>
                          </div>
          </Col>
          <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
          
            <Field
                            id="enabledChannel"
                            name="enabledChannel"
                            placeholder="Enabled Channel"
                            component={renderSelectField}
                            options={CHANNELS_OPTIONS}
                            valueKey="value"
                            labelKey="label"
                          />
                          </div>
                          </div>
          </Col>
          <Col lg={{size: 3, offset: 3}} style={{textAlign: "right"}}>
          <Button color="primary">
                  FIlter
              </Button>
          </Col>
              
          </Row>
        </form>
      {/* </Col> */}
    </Row>
  );
};

export default reduxForm({
  form: "custom_filter",
  validate,
  enableReinitialize: true
})(CustomFilter);
