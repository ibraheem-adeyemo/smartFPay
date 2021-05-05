import React from "react";
import renderToggleButtonField from "../../../shared/components/form/ToggleButton";
import { Field, reduxForm } from "redux-form";
import logoLight from "../../../assets/isw-logo-blue.png";
import logoDark from "../../../assets/isw-logo-black.jpg";
import { connect } from "react-redux";

const ThemeSwitch = props => {
  const handleToggle = value => {
    if (value) {
      props.changeToDark();
    } else {
      props.changeToLight();
    }
  };
  const isLight = props.theme?.className === "theme-light";
  return (
    <form className={`form form--horizontal theme-switch ${isLight ? "light" : "dark"}`}>
      <div className="powered-by">
        <span>Powered By</span>
        <img alt="interswitch logo" src={isLight ? logoLight : logoDark} />
      </div>
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

export default connect(({theme}) => ({theme}))(reduxForm({
  form: "theme_switch",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ThemeSwitch));
