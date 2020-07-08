import React, { PureComponent, useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

class SelectField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    isMulti: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
      })
    ),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
      })
    ]).isRequired
  };

  static defaultProps = {
    placeholder: "",
    isMulti: false,
    options: [],
  };

  handleChange = selectedOption => {
    if (this.props.customChange) {
      this.props.customChange(selectedOption);
    }
    const { onChange } = this.props;
    onChange(selectedOption);
  };

  render() {
    const {
      value,
      name,
      disabled,
      placeholder,
      isMulti,
      id,
      options,
      labelKey,
      valueKey,
      defaultValue
    } = this.props;

    return (
      <Select
        name={name}
        id={id}
        isDisabled={disabled}
        value={value}
        onChange={this.handleChange}
        getOptionLabel={option => option[labelKey]}
        getOptionValue={option => option[valueKey]}
        options={options}
        clearable={false}
        className="react-select"
        defaultValue={defaultValue}
        placeholder={placeholder}
        isMulti={isMulti}
        classNamePrefix="react-select"
      />
    );
  }
}

const renderSelectField = props => {
  const {
    input,
    meta,
    options,
    disabled,
    placeholder,
    id,
    valueKey,
    labelKey,
    customChange,
    isMulti,
    defaultValue
  } = props;
  return (
    <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
      <SelectField
        {...input}
        id={id}
        options={options}
        placeholder={placeholder}
        valueKey={valueKey}
        disabled={disabled}
        labelKey={labelKey}
        customChange={customChange}
        isMulti={isMulti}
        defaultValue={defaultValue}
      />
      {meta.error && (
        <span className="form__form-group-error">{meta.error}</span>
      )}
    </div>
  );
};

renderSelectField.propTypes = {
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
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool
};

renderSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: "",
  isMulti: false
};

export default renderSelectField;
