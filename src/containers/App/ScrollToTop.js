import { memo, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const ScrollToTop = memo(props => {
  const { location, children } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
});

export default withRouter(ScrollToTop);

ScrollToTop.proptypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  children: PropTypes.element.isRequired
};
