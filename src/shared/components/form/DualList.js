import React, { PureComponent } from "react";
import DualListBox from "react-dual-listbox";
import PropTypes from "prop-types";
import "react-dual-listbox/lib/react-dual-listbox.css";

class DualList extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
        label: PropTypes.string
      })
    ),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string
        })
      )
    ]).isRequired
  };

  static defaultProps = {
    placeholder: "",
    options: []
  };

  state = {
    selected: []
  };

  handleChange = value => {
    const { onChange } = this.props;
    this.setState({ selected: value });
    onChange(value);
  };

  render() {
    const { value, name, options } = this.props;

    return (
      <DualListBox
        name={name}
        selected={value ? value : []}
        value={value}
        simpleValue={false}
        canFilter
        options={options}
        onChange={this.handleChange}
      />
    );
  }
}

const renderDualList = props => {
  const { input, meta, options, placeholder } = props;
  return (
    <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
      <DualList {...input} options={options} placeholder={placeholder} />
      {meta.touched && meta.error && (
        <span className="form__form-group-error">{meta.error}</span>
      )}
    </div>
  );
};

renderDualList.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string
    })
  ),
  placeholder: PropTypes.string
};

renderDualList.defaultProps = {
  meta: null,
  options: [],
  placeholder: ""
};

export default renderDualList;
