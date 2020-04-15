import React from "react";
import { Field, reduxForm } from "redux-form";
import { MdSearch } from "react-icons/md";
import { Row, Col } from "reactstrap";

const CustomSearch = props => {
  return (
    <Row>
      <Col lg={{ size: 4, offset: 8 }} offset="8">
        <form className="form" onSubmit={props.handleSubmit}>
          <div className="form__form-group">
            <div className="form__form-group-field">
              <Field
                name="pageNumber"
                component="div"
              />
              <Field
                name="pageSize"
                component="div"
              />
              <Field
                name="searchWord"
                component="input"
                placeholder="Search by keyword (account, card, ...)"
              />
              <button type="submit" className={`form__form-group-button`}>
                <MdSearch />
              </button>
            </div>
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default reduxForm({
  form: "custom_search",
  enableReinitialize: true
})(CustomSearch);
