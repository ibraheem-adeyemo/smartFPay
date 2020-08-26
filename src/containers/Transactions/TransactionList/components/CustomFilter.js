import React, {memo} from "react";
import { Field, reduxForm } from "redux-form";
import { MdSearch, MdFilterList, MdFileDownload } from "react-icons/md";
import { Row, Col, Button, Spinner } from "reactstrap";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import renderSelectField from "../../../../shared/components/form/Select";
import { CHANNELS_OPTIONS } from "../../../../constants/app.constants";
import { COUNTRIES } from "../../../../constants/countries";
import { renderField } from "../../../../utils/renderfield";
import validate from './validate';

const CustomFilter = memo(props => {
  const {
    submitting,
    pristine,
    invalid
  } = props;
  return (
    <Row style={{paddingRight: "1rem", paddingLeft: "1rem"}}>
        <form className="form" onSubmit={props.handleDownload}>
            <Row>
                <Col lg="3">
          <div className="form__form-group">
          <div className="form__form-group-field">
                          <Field
                            id="limitId"
                            name="limitId"
                            component={renderField}
                            type="number"
                            placeholder="Limit ID"
                          />
              </div>
              </div>
              </Col>
              <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
            <Field
                            id="tokenizedPan"
                            name="tokenizedPan"
                            component={renderField}
                            type="text"
                            placeholder="Tokenized Pan"
                          />
            </div>
          </div></Col>
          <Col lg="3">
          <div className="form__form-group">
          <div className="form__form-group-field">
                          <Field
                            id="decline"
                            name="decline"
                            component={renderField}
                            type="number"
                            placeholder="Decline"
                          />
              </div>
              </div>
              </Col>
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
            </div>
          </div></Col>
          <Col lg="3">
          <div className="form__form-group">
          <div className="form__form-group-field">
                          <Field
                            id="customerName"
                            name="customerName"
                            component={renderField}
                            type="text"
                            placeholder="customerName"
                          />
              </div>
              </div>
              </Col>
              <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
            <Field
                            id="maskedPan"
                            name="maskedPan"
                            component={renderField}
                            type="text"
                            placeholder="Masked Pan"
                          />
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
                            id="country"
                            name="country"
                            placeholder="Country"
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
                            id="paymentType"
                            name="paymentType"
                            placeholder="Payment Type"
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
                            id="channel"
                            name="channel"
                            placeholder="Channel"
                            component={renderSelectField}
                            options={CHANNELS_OPTIONS}
                            valueKey="label"
                            labelKey="value"
                          />
                          </div>
                          </div>
          </Col>
          <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
            <Field
                            id="violationCode"
                            name="violationCode"
                            placeholder="Violation Code"
                            component={renderSelectField}
                            options={COUNTRIES}
                            valueKey="alpha3Code"
                            labelKey="name"
                          />
                          </div>
                          </div>
          </Col>
          <Col lg={{size: 6, offset: 6}} style={{textAlign: "right"}}>
                    <Button
                    color="primary"
                      type="button"
                      id="filter-form"
                      onClick={props.handleFilter}
                      disabled={submitting || invalid}
                    >
                      {false ? <span><Spinner size="sm" color="default" />{" "}</span> : <span><MdFilterList /> </span>}
                      Filter
                    </Button>
                    <Button
                      color="primary"
                      id="submit-btn"
                      type="button"
                      onClick={props.handleDownload}
                      disabled={submitting || invalid}
                    >
                      {false ? <span><Spinner size="sm" color="default" />{" "}</span> : <span><MdFileDownload /> </span>}
                      Download
                    </Button>
          </Col>
              
          </Row>
        </form>
    </Row>
  );
});

export default reduxForm({
  form: "transactions_custom_filter",
  validate,
  enableReinitialize: true
})(CustomFilter);
