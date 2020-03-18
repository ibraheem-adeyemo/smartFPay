import React from "react";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";

import TableComponent from "./Table";
import { message } from "../../../constants/app.constants";
import Paginator from "./Paginator";
import { TableHeader } from "./TableHeader";
import TableFilter from "./TableFilter";
import { tableUtils } from "../../../utils/table.utils";

export default class DataTable extends React.Component {
  state = {
    allData: [],
    pageData: [],
    pageSize: this.props.defaultPageSize || 10,
    pageNumber: this.props.defaultPageNumber || 1,
    count: this.props.count,
    hasParams: false,
    numberOfPages: null,
    filterState: null,
    sort: {
      column: null,
      direction: "desc"
    }
  };

  static getDerivedStateFromProps(nextProps, previousState) {
    const { count } = nextProps;
    const { pageSize, numberOfPages, pageNumber } = previousState;

    const data = nextProps.data;
    let stateUpdate = null;

    if (count !== previousState.count || !numberOfPages) {
      const numberOfPageState = tableUtils.getNumberOfPages(
        pageSize,
        nextProps.count
      );

      stateUpdate = {
        numberOfPages: numberOfPageState,
        count: nextProps.count
      };
    }
    if (data) {
      const page = tableUtils.createPageData(
        pageNumber,
        pageSize,
        data,
        nextProps.serverside
      );
      stateUpdate = { ...stateUpdate, pageData: page };
    }

    return stateUpdate;
  }

  updatePage = (pageNumber, pageSize, allData) => {
    const pageData = tableUtils.createPageData(
      pageNumber,
      pageSize,
      allData,
      this.props.serverside
    );
    this.setState({ pageData });
  };

  handlePreviousClick = () => {
    this.setState(
      previousState => {
        if (previousState.pageNumber > 1) {
          return {
            ...previousState,
            pageNumber: previousState.pageNumber - 1
          };
        }
      },
      () => {
        const { pageNumber, pageSize, allData } = this.state;
        if (this.props.serverside) {
          this.props.loadData(pageNumber, pageSize);
        }
        this.updatePage(pageNumber, pageSize, allData);
      }
    );
  };

  handleNextClick = () => {
    this.setState(
      previousState => {
        if (previousState.pageNumber < this.state.numberOfPages) {
          return {
            ...previousState,
            pageNumber: previousState.pageNumber + 1
          };
        }
      },
      () => {
        const { pageNumber, pageSize, allData } = this.state;
        if (this.props.serverside) {
          this.props.loadData(pageNumber, pageSize);
        }
        this.updatePage(pageNumber, pageSize, allData);
      }
    );
  };

  handlePageSizeChange = value => {
    this.setState(
      previousState => {
        if (previousState.pageSize !== value) {
          return {
            ...previousState,
            pageNumber: 1,
            pageSize: value,
            numberOfPages: tableUtils.getNumberOfPages(
              Number(value),
              Number(this.props.count)
            )
          };
        }
      },
      () => {
        const { pageNumber, pageSize, allData } = this.state;
        if (this.props.serverside) {
          this.props.loadData(pageNumber, pageSize);
        }
        this.updatePage(pageNumber, pageSize, allData);
      }
    );
  };

  handlePageNumberChange = value => {
    if (!value) {
      this.setState(
        previousState => {
          return {
            ...previousState,
            pageNumber: value
          };
        },
        () => {
          const { pageNumber, pageSize, allData } = this.state;
          this.updatePage(pageNumber, pageSize, allData);
        }
      );
    } else if (value >= 1 && value <= this.state.numberOfPages) {
      this.setState(
        previousState => {
          return {
            ...previousState,
            pageNumber: Number(value)
          };
        },
        () => {
          const { pageNumber, pageSize, allData } = this.state;
          if (this.props.serverside) {
            this.props.loadData(pageNumber, pageSize);
          }
          this.updatePage(pageNumber, pageSize, allData);
        }
      );
    }
  };

  handleSort = (column, defaultDirection) => {
    const { pageSize, pageNumber } = this.state;

    if (this.props.serverside) {
      this.props.sortFn(pageNumber, pageSize, column);
      this.setState({
        sort: {
          column
        }
      });
    } else {
      const direction = defaultDirection
        ? defaultDirection
        : this.state.sort.column
        ? this.state.sort.direction === "desc"
          ? "asc"
          : "desc"
        : "asc";
      const sortedData = tableUtils.sortData(
        this.state.allData,
        column,
        direction
      );
      this.setState(
        previousState => {
          return {
            ...previousState,
            allData: sortedData,
            sort: {
              column,
              direction
            }
          };
        },
        () => {
          const { pageNumber, pageSize, allData } = this.state;
          this.updatePage(pageNumber, pageSize, allData);
        }
      );
    }
  };

  handleFilter = data => {
    const allData = this.props.data ? this.props.data : [];
    let filteredData = tableUtils.filterData(allData, data);

    if (this.state.sort.column && this.state.sort.direction) {
      filteredData = tableUtils.sortData(
        filteredData,
        this.state.sort.column,
        this.state.sort.direction
      );
    }

    this.setState(
      previousState => {
        return {
          ...previousState,
          allData: filteredData,
          numberOfPages: tableUtils.getNumberOfPages(
            this.state.pageSize,
            this.props.count
          )
        };
      },
      () => {
        const { pageNumber, pageSize, allData } = this.state;
        this.updatePage(pageNumber, pageSize, allData);
      }
    );
  };

  setFilterState = data => {
    this.setState({
      filterState: data
    });
  };

  customSearchFn = values => {
    this.setState(
      {
        pageNumber: 1
      },
      () => this.props.customSearchFn(values)
    );
  };

  render() {
    const {
      columns,
      actions,
      error,
      size,
      bordered,
      borderless,
      striped,
      dark,
      hover,
      defaultPageSize,
      defaultPageNumber,
      responsive,
      serverside,
      loading,
      countName,
      permissions,
      tableKey,
      customSearch,
      NoDataText,
      count,
      loadData
    } = this.props;

    const {
      pageSize,
      pageNumber,
      numberOfPages,
      pageData,
      sort,
      filterState,
      allData
    } = this.state;
    return (
      <div>
        <TableHeader
          pageSize={pageSize}
          pageNumber={pageNumber}
          loading={loading}
          countName={countName}
          count={count}
          loadData={loadData}
        />
        {error && allData ? (
          <Alert color="danger">{message.OUTDATED_DATA}</Alert>
        ) : null}

        {customSearch && serverside ? (
          customSearch
        ) : (
          <>
            {!serverside && (
              <TableFilter
                loading={loading}
                filterData={this.handleFilter}
                onSubmit={this.handleFilter}
                columns={columns}
                tableKey={tableKey}
                filterState={filterState}
                setFilterState={this.setFilterState}
              />
            )}
          </>
        )}

        <TableComponent
          columns={columns}
          actions={actions}
          data={pageData}
          permissions={permissions}
          dark={dark}
          hover={hover}
          bordered={bordered}
          borderless={borderless}
          striped={striped}
          responsive={responsive}
          size={size}
          loading={loading}
          NoDataText={NoDataText}
          sort={this.handleSort}
          sortState={sort}
        />
        {!!numberOfPages && (
          <Paginator
            recordsPerPage={pageSize || defaultPageSize}
            pageNumber={pageNumber || defaultPageNumber}
            numberOfPages={numberOfPages}
            next={this.handleNextClick}
            pageCountChange={this.handlePageSizeChange}
            pageNumberChange={this.handlePageNumberChange}
            prev={this.handlePreviousClick}
          />
        )}
      </div>
    );
  }
}

DataTable.propTypes = {
  tableKey: PropTypes.string,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  data: PropTypes.array,
  count: PropTypes.number,
  countName: PropTypes.string,
  defaultPageSize: PropTypes.number,
  error: PropTypes.object,
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool
};
