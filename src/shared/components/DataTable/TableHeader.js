import React from "react";
import { Row, Col, Spinner } from "reactstrap";
import { MdAutorenew } from "react-icons/md";
import PropTypes from "prop-types";

export const TableHeader = ({
  loading,
  countName,
  count,
  loadData,
  pageSize,
  pageNumber
}) => {
  const pageStart = (pageNumber || 1) * pageSize - (pageSize - 1);
  const pageEnd = Math.min(pageStart + pageSize - 1, count);

  return (
    <Row className="mb-1">
      <Col sm="6">
        <h5 className="item-count">
          {loading ? (
            `Fetching ${countName || "Result(s)"}...`
          ) : (
            <span>
              {!!count &&
                `Showing ${pageStart} to ${pageEnd} of ${count} ${countName ||
                  "Result(s)"}`}
            </span>
          )}
        </h5>
      </Col>
      {!!loadData && (
        <Col sm="6">
          <div className="text-right">
            <button
              id="refresh-btn"
              disabled={loading}
              onClick={() => loadData(pageNumber, pageSize)}
              className="btn btn-outline-primary btn-sm"
            >
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <span>
                  <MdAutorenew size={20} /> Refresh
                </span>
              )}
            </button>
          </div>
        </Col>
      )}
    </Row>
  );
};

TableHeader.propTypes = {
  loading: PropTypes.bool,
  countName: PropTypes.string,
  count: PropTypes.number,
  loadData: PropTypes.func,
  pageSize: PropTypes.number,
  pageNumber: PropTypes.number
};
