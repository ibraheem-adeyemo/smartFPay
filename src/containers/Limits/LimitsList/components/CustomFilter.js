import React, {memo} from "react";
import { Field, getFormValues, reduxForm, reset } from "redux-form";
import { MdFileDownload, MdFilterList, MdClear } from "react-icons/md";
import { Row, Col, Button, Spinner } from "reactstrap";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import renderSelectField from "../../../../shared/components/form/Select";
import { CARD_STATUS_OPTIONS, CHANNELS_OPTIONS } from "../../../../constants/app.constants";
import { COUNTRIES } from "../../../../constants/countries";
import { renderField } from "../../../../utils/renderfield";
import validate from './validate';
import { connect } from "react-redux";

const CustomFilter = memo(props => {
  const {
    submitting, invalid, dispatch, values
  } = props;

  const {
    accountName,
    accountNumber,
    enabledCountry,
    enabledChannel,
    cardStatus,
    startDate,
    endDate
  } = values;

  const hasFilter = accountName || accountNumber || enabledChannel || enabledCountry
    || cardStatus || (startDate && endDate);

  const handleReset = () => {
    dispatch(reset("limits_custom_filter"));
    props.handleFilter(true)
  }

  return (
    <Row style={{paddingRight: "1rem", paddingLeft: "1rem"}}>
      {/* <Col> */}
        <form className="form">
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
                            minDate={new Date('October 1, 1960 00:00:00')}
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
                            minDate={new Date('October 1, 1960 00:00:00')}
                            timeFormat="HH:mm"
                            showTimeInput={true}
                            component={renderDatePickerField}
                            placeholder="End Date"
                            timeInputLabel="End Time"
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
                            isClearable={true}
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
                            id="cardStatus"
                            name="cardStatus"
                            placeholder="Card Status (card limits only)"
                            component={renderSelectField}
                            options={CARD_STATUS_OPTIONS}
                            isClearable={true}
                            valueKey="value"
                            labelKey="label"
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
                            isClearable={true}
                          />
                          </div>
                          </div>
          </Col>
          <div style={{display: "flex", justifyContent: "flex-end", width: "100%", marginRight: 20}}>
            <Button
                      color="primary"
                      type="button"
                      id="reset-form"
                      onClick={handleReset}
                      disabled={!hasFilter}
                    >
                      <span><MdClear /> </span>
                      Reset
                    </Button>
          <Button
                    color="primary"
                      type="button"
                      id="filter-form"
                      onClick={() => props.handleFilter()}
                      disabled={submitting || invalid || !hasFilter}
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
          </div>
              
          </Row>
        </form>
      {/* </Col> */}
    </Row>
  );
});

export default reduxForm({
  form: "limits_custom_filter",
  validate,
  destroyOnUnmount: false
})(
  connect(state => ({
    values: getFormValues("limits_custom_filter")(state),
  }))(CustomFilter))
