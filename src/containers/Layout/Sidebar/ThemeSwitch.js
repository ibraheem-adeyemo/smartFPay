import React from "react";
import renderToggleButtonField from "../../../shared/components/form/ToggleButton";
import { Field, reduxForm } from "redux-form";

const ThemeSwitch = props => {
  const handleToggle = value => {
    if (value) {
      props.changeToDark();
    } else {
      props.changeToLight();
    }
  };
  return (
    <form className="form form--horizontal theme-switch">
      <div className="form__form-group">
        <span className="form__form-group-label">Dark Mode</span>
        <div className="form__form-group-field">
          <Field
            name="theme"
            onChange={handleToggle}
            component={renderToggleButtonField}
          />
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "theme_switch",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ThemeSwitch);
