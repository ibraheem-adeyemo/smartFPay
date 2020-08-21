import React from "react";
import { Field, reduxForm } from "redux-form";
import { MdSearch, MdFilterList, MdFileDownload } from "react-icons/md";
import { Row, Col, Button, ButtonToolbar } from "reactstrap";
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
        <form className="form" onSubmit={props.handleFilter}>
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
                            id="createdBy"
                            name="createdBy"
                            component={renderField}
                            type="text"
                            placeholder="Actor"
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
                            id="action"
                            name="action"
                            placeholder="User Action"
                            component={renderSelectField}
                            options={COUNTRIES}
                            valueKey="alpha3Code"
                            labelKey="name"
                          />
                          </div>
                          </div>
          </Col>
          <Col lg={{size: 6, offset: 3}} style={{textAlign: "right"}}>
                    <Button
                      type="button"
                      id="reset-form"
                      onClick={props.handleFilter}
                      // disabled={pristine || submitting}
                    >
                      {true && <span style={{marginRight:"5px"}}><MdFilterList /></span>}
                      Filter
                    </Button>
                    <Button
                      color="primary"
                      id="submit-btn"
                      type="submit"
                      // disabled={submitting || invalid}
                    >
                      {/* {postuser?.loading ? (
                        <span>
                          <Spinner size="sm" color="default" />{" "}
                        </span>
                      ) : null} */}
                      {true && <span style={{marginRight:"5px"}}><MdFileDownload /></span>}
                      Download
                    </Button>
          </Col>
              
          </Row>
        </form>
      {/* </Col> */}
    </Row>
  );
};

export default reduxForm({
  form: "custom_search",
  validate,
  enableReinitialize: true
})(CustomFilter);
