import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { MdFilterList, MdFileDownload, MdClear } from "react-icons/md";
import { Row, Col, Button, Spinner } from "reactstrap";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import renderSelectField from "../../../../shared/components/form/Select";
import { ACTION_TYPES } from "../../../../constants/app.constants";
import { renderField } from "../../../../utils/renderfield";
import validate from './validate';

const CustomFilter = props => {
  const {
    submitting,
    invalid,
    dispatch
  } = props;
  return (
    <Row style={{paddingRight: "1rem", paddingLeft: "1rem"}}>
        <form className="form" onSubmit={props.handleDownload}>
            <Row>
                <Col lg="3">
          <div className="form__form-group">
          <div className="form__form-group-field">
                          <Field
                            id="email"
                            name="email"
                            component={renderField}
                            type="email"
                            placeholder="Email Address"
                          />
              </div>
              </div>
              </Col>
              <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
            <Field
                            id="createdBy"
                            name="createdBy"
                            component={renderField}
                            type="text"
                            placeholder="Actor"
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
                            required
                          />
                          </div>
                          </div>
          </Col>
          <Col lg="3">
          <div className="form__form-group">
            <div className="form__form-group-field">
            <Field
                            id="action"
                            name="action"
                            placeholder="User Action"
                            component={renderSelectField}
                            options={ACTION_TYPES}
                            valueKey="value"
                            labelKey="label"
                          />
                          </div>
                          </div>
          </Col>
          <Col lg={{size: 6, offset: 3}} style={{textAlign: "right"}}>
                    <Button
                      color="primary"
                      type="button"
                      id="reset-form"
                      onClick={() => dispatch(reset("reports_custom_filter"))}
                    >
                      <span><MdClear /> </span>
                      Reset
                    </Button>
                    <Button
                      color="primary"
                      type="button"
                      id="filter-form"
                      onClick={props.handleFilter}
                      disabled={submitting || invalid}
                    >
                      <span><MdFilterList /> </span>
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
};

export default reduxForm({
  form: "reports_custom_filter",
  validate,
  enableReinitialize: true
})(CustomFilter);
