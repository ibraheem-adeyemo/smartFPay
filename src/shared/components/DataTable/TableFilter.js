import React, { Component, Fragment } from "react";
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { MdCancel } from "react-icons/md";
import PropTypes from "prop-types";

class TableFilter extends Component {
  state = { filters: [] };

  componentWillReceiveProps(nextProps) {
    if (!this.props.filterState && nextProps.filterState) {
      const filterKeys = Object.keys(nextProps.filterState);
      const filters = nextProps.columns.filter(column =>
        filterKeys.includes(column.accessor)
      );
      this.setState({
        filters
      });
    }
  }

  addFilter = param => {
    if (!this.state.filters.includes(param)) {
      this.setState({
        filters: [...this.state.filters, param]
      });
    }
  };

  removeRow = index => {
    const { filters } = this.state;
    const filteredItems = filters
      .slice(0, index)
      .concat(filters.slice(index + 1, filters.length));
    this.setState(
      {
        filters: filteredItems
      },
      () => {
        if (!this.state.filters.length) {
          this.props.onSubmit({});
        }
      }
    );
  };

  setFilterState = data => {
    this.props.setFilterState(data);
  };

  render() {
    const { columns, loading, handleSubmit } = this.props;
    const { filters } = this.state;
    const fiterParams = columns.filter(column => column.filterable === true);
    return (
      <Fragment>
        {fiterParams && fiterParams.length && !loading ? (
          <UncontrolledDropdown>
            <DropdownToggle className="btn-sm" caret>
              Filter by
            </DropdownToggle>
            <DropdownMenu className="dropdown__menu">
              {fiterParams.map((param, index) => (
                <DropdownItem
                  onClick={() => this.addFilter(param)}
                  className="btn-sm"
                  key={index}
                >
                  {param.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : null}
        {filters && filters.length ? (
          <form className="form form--horizontal" onSubmit={handleSubmit}>
            {filters.map((filter, index) => (
              <div className="form__form-group" key={index}>
                <span className="form__form-group-label">{filter.name}</span>
                <div className="form__form-group-field">
                  <Field
                    name={filter.accessor}
                    component={filter.filterOptions ? "select" : "input"}
                    placeholder={filter.name}
                  />
                  <button
                    type="button"
                    className={`form__form-group-button`}
                    onClick={() => this.removeRow(index)}
                  >
                    <MdCancel />
                  </button>
                </div>
              </div>
            ))}
            {!!filters.length && (
              <div className="text-right">
                <Button color="primary" type="submit" size="sm">
                  Apply
                </Button>
              </div>
            )}
          </form>
        ) : null}
      </Fragment>
    );
  }
}

TableFilter.propTypes = {
  loading: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  filterState: PropTypes.object,
  filterData: PropTypes.func.isRequired,
  setFilterState: PropTypes.func.isRequired
};

export default reduxForm({
  form: "filter_form" // a unique identifier for this form
})(TableFilter);
