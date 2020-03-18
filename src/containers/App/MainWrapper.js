import React, { memo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeProps } from "../../shared/prop-types/ReducerProps";

const MainWrapper = memo(props => {
  const { theme, children, hasError } = props;

  return (
    <div className={`${theme.className} ${hasError && "blur"}`}>
      <div className="wrapper">{children}</div>
    </div>
  );
});

MainWrapper.propTypes = {
  theme: ThemeProps.isRequired,
  children: PropTypes.element.isRequired
};

export default connect(state => ({
  theme: state.theme
}))(MainWrapper);
