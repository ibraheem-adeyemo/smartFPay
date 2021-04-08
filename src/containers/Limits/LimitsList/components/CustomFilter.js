import React, {memo} from "react";
import { Field, reduxForm, reset } from "redux-form";
import { MdFileDownload, MdFilterList, MdClear } from "react-icons/md";
import { Row, Col, Button, Spinner } from "reactstrap";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import renderSelectField from "../../../../shared/components/form/Select";
import { CHANNELS_OPTIONS } from "../../../../constants/app.constants";
import { COUNTRIES } from "../../../../constants/countries";
import { renderField } from "../../../../utils/renderfield";
import validate from './validate';

const CustomFilter = memo(props => {
  const {
    submitting, invalid, dispatch
  } = props;

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
          <Col style={{textAlign: "right"}}>
            <Button
                      color="primary"
                      type="button"
                      id="reset-form"
                      onClick={handleReset}
                    >
                      <span><MdClear /> </span>
                      Reset
                    </Button>
          <Button
                    color="primary"
                      type="button"
                      id="filter-form"
                      onClick={() => props.handleFilter()}
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
      {/* </Col> */}
    </Row>
  );
});

export default reduxForm({
  form: "limits_custom_filter",
  validate,
  destroyOnUnmount: false
})(CustomFilter);
