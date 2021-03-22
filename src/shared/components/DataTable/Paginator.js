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
      <Row className="paginator">
        <Button
          id="previous-page"
          className="paginator-control"
          disabled={pageNumber <= 1}
          onClick={prev}
          outline
        >
          <MdChevronLeft />
          Previous
        </Button>
        <div className="page-desc">
          <div className="">Page</div>
          <input
            value={pageNumber}
            onChange={this.handlePageNumberChange}
            className="page-input"
            type="number"
          />
          <div
            className=""
            style={{ minWidth: "30%" }}
          >
            of {numberOfPages}
          </div>
        </div>
        <div className="page-desc">
          <div className="">Show</div>
          <select
            value={recordsPerPage}
            onChange={this.handlePageSizeChange}
            name="select"
            id="rowcount"
            className="page-input select"
          >
            {PAGE_SIZE_OPTIONS.map((option, index) => (
              <option key={`option${index}`}>{option}</option>
            ))}
          </select>
          <div className="">records</div>
        </div>
        <Button
          className="paginator-control"
          disabled={pageNumber >= numberOfPages}
          onClick={next}
          outline
          id="next-page"
        >
          Next
          <MdChevronRight />
        </Button>
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
