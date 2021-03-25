import React, { memo, useState, PureComponent } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

class CustomInput extends PureComponent {
  render() {
    const { id, onClick, value, placeholder } = this.props;
    return (
      <input
        id={id}
        onClick={onClick}
        value={value}
        type="text"
        placeholder={placeholder}
        readOnly={true}
      />
    );
  }
}

const DatePickerField = memo(
  ({ onChange, meta: {touched, error}, id, minDate, placeholder, maxDate, dateFormat, onBlur, value, showMonthYearPicker, showTimeInput,  disabled, timeInputLabel }) => {
    const [startDate, setStartDate] = useState(null);
    const handleChange = date => {
      setStartDate(date);
      onChange(date);
      onBlur()
    };

    return (
      <div className="date-picker form__form-group-input-wrap form__form-group-input-wrap--error-above">
        <DatePicker
          className="form__form-group-datepicker"
          selected={value || null}
          dateFormat={dateFormat}
          onChange={handleChange}
          showTimeInput={showTimeInput}
          timeInputLabel={timeInputLabel}
          peekNextMonth
          value={startDate}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          id={id}
          placeholderText={placeholder}
          showMonthYearPicker={showMonthYearPicker ? true : false}
          showMonthDropdown
          showYearDropdown
          isClearable={true}
          customInput={<CustomInput placeholder={placeholder} />}
          dropDownMode="select"
          popperModifiers={{preventOverflow: {priority: ["top"]}}}
        />
        {error && (
          <span className="form__form-group-error">{error}</span>
        )}
      </div>
    );
  }
);

const renderDatePickerField = props => {
  const { input, id, placeholder, minDate, maxDate, meta, dateFormat, showMonthYearPicker, showTimeInput, timeInputLabel, disabled } = props;
  return (
    <DatePickerField
      meta={meta}
      minDate={minDate}
      maxDate={maxDate}
      dateFormat={dateFormat}
      showTimeInput={showTimeInput}
      timeInputLabel={timeInputLabel}
      disabled={disabled}
      id={id}
      placeholder={placeholder}
      showMonthYearPicker={showMonthYearPicker ? true : false}
      {...input}
    />
  );
};

renderDatePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string
  }).isRequired
};

DatePickerField.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default renderDatePickerField;
