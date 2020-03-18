import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import PropTypes from "prop-types";

import { PAGE_SIZE_OPTIONS } from "../../../constants/app.constants";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

class Paginator extends Component {
  handlePageSizeChange = event => {
    const value = event.target.value;
    this.props.pageCountChange(Number(value));
  };

  handlePageNumberChange = event => {
    const value = event.target.value;
    this.props.pageNumberChange(value ? Number(value) : "");
  };

  render() {
    const {
      pageNumber,
      numberOfPages,
      recordsPerPage,
      next,
      prev
    } = this.props;

    return (
      <Row className="my-3 form">
        <Col sm="3">
          <Button
            size="sm"
            id="previous-page"
            className="icon"
            disabled={pageNumber <= 1}
            onClick={prev}
            outline
          >
            <MdChevronLeft />
            Previous
          </Button>
        </Col>
        <Col sm="6" className="text-center">
          <Row>
            <Col md="6">
              <div className="form__form-group">
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">Page</div>
                  <input
                    value={pageNumber}
                    onChange={this.handlePageNumberChange}
                    className="text-center"
                    type="number"
                  />
                  <div
                    className="form__form-group-icon"
                    style={{ minWidth: "30%" }}
                  >
                    of {numberOfPages}
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form__form-group">
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">Show</div>
                  <select
                    value={recordsPerPage}
                    onChange={this.handlePageSizeChange}
                    name="select"
                    id="rowcount"
                  >
                    {PAGE_SIZE_OPTIONS.map((option, index) => (
                      <option key={`option${index}`}>{option}</option>
                    ))}
                  </select>
                  <div className="form__form-group-icon">records</div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm="3" className="text-right">
          <Button
            size="sm"
            className="icon"
            disabled={pageNumber >= numberOfPages}
            onClick={next}
            outline
            id="next-page"
          >
            Next
            <MdChevronRight />
          </Button>
        </Col>
      </Row>
    );
  }
}

Paginator.propTypes = {
  next: PropTypes.func.isRequired,
  numberOfPages: PropTypes.number,
  pageCountChange: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageNumberChange: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  recordsPerPage: PropTypes.number.isRequired
};

export default Paginator;
