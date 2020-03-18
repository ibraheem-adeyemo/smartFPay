import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Table, Spinner, UncontrolledTooltip } from "reactstrap";
import { MdUnfoldMore } from "react-icons/md";
import { checkPermissions } from "../../../utils/accessControl";

export default class TableComponent extends React.Component {
  sort = column => {
    if (column.sortable && this.props.data.length) {
      this.props.sort(column);
    }
  };

  getColumns = () => {
    let columns = this.props.columns;
    if (this.props.actions) {
      columns = [
        ...columns,
        {
          name: "Actions",
          Cell: row => (
            <Fragment>
              {this.props.actions.map(action => (
                <Fragment key={action.name}>
                  {(!action.permissions ||
                    checkPermissions(
                      this.props.permissions,
                      action.permissions
                    )) && (
                    <Fragment>
                      <span
                        id={`${action.name}-${row.id}`}
                        name={action.name}
                        onClick={() => action.btnAction(row, action)}
                        className={`mx-2 pointer text-${action.btnClass}`}
                      >
                        {action.btnIcon({
                          size: 22
                        })}
                      </span>
                      <UncontrolledTooltip
                        placement="bottom"
                        target={`${action.name}-${row.id}`}
                      >
                        {action.btnText}
                      </UncontrolledTooltip>
                    </Fragment>
                  )}
                </Fragment>
              ))}
            </Fragment>
          )
        }
      ];
    }
    return columns;
  };

  render() {
    const {
      columns,
      data,
      loading,
      size,
      bordered,
      borderless,
      striped,
      dark,
      hover,
      responsive,
      NoDataText,
      sortState
    } = this.props;

    const tableColumns = this.getColumns().map((column, index) => (
      <th
        key={index}
        onClick={() => this.sort(column)}
        className={`${column.sortable ? "pointer" : ""}`}
      >
        {(column.renderHeader && column.renderHeader()) || column.name}
        {column.sortable &&
          sortState.column &&
          sortState.column.accessor === column.accessor && (
            <MdUnfoldMore size={15} className="float-right" />
          )}
      </th>
    ));

    const tableRows =
      data && data.length ? (
        data.map((row, index) => (
          <tr key={index}>
            {this.getColumns().map((column, index) => {
              const original = row;
              const cell = column.Cell
                ? column.Cell(original)
                : row[column.accessor];

              return <td key={index}>{cell}</td>;
            })}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={this.props.actions ? columns.length + 1 : columns.length}
            align="center"
          >
            {loading ? (
              <Spinner size="10rem" />
            ) : (
              <h4 className="font-weight-bold">
                {NoDataText || "No results found"}
              </h4>
            )}
          </td>
        </tr>
      );
    return (
      <Table
        dark={dark}
        hover={hover}
        bordered={bordered}
        borderless={borderless}
        striped={striped}
        responsive={responsive}
        size={size}
      >
        <thead>
          <tr>{tableColumns}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    );
  }
}

Table.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  columns: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool,
  sort: PropTypes.func,
  sortState: PropTypes.object,
  size: PropTypes.string,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  striped: PropTypes.bool,
  dark: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object
  ])
};
