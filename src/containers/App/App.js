import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import Router from "../Router/Router";

import {
  getCurrentUser,
  getPermissions
} from "../CurrentUser/actions/currentUser.actions";

import ScrollToTop from "./ScrollToTop";

import "bootstrap/dist/css/bootstrap.css";
import "../../scss/app.scss";
import { MdSentimentVeryDissatisfied } from "react-icons/md";

const App = props => {
  const { dispatch } = props;

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const loadPage = () => {
    window.addEventListener("load", () => {
      setLoading({ loading: false });
      setTimeout(() => setLoaded({ loaded: true }), 200);
    });
  };

  useEffect(() => {
    const getUser = () => {
      dispatch(getCurrentUser());
    };

    const getUserPermissions = () => {
      dispatch(getPermissions());
    };

    // const getAssignedIssuer = () => {
    //   dispatch(viewIissuerDomainMapping());
    // };

    loadPage();
    getUser();
    getUserPermissions();
    // getAssignedIssuer();
  }, [dispatch]);

  const hasError = false
  return (
    <BrowserRouter basename="/payment-control-system">
      <ScrollToTop>
        <Fragment>
          {!loaded && (
            <div className={`App load${loading ? "" : " loaded"}`}>
              <div className="load__icon-wrap">
                <svg className="load__icon">
                  <path
                    fill="#003553"
                    d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                  />
                </svg>
              </div>
            </div>
          )}
          <div>
            {hasError ? (
              <div className="app-load-error">
                <Alert color="danger">
                  <MdSentimentVeryDissatisfied size={40} />
                  <h4 className="font-weight-bold">
                    Failed to load application
                  </h4>
                  <p>Please refresh your browser to try again</p>
                  <p>
                    If this issue persists, please contact your administrator
                  </p>
                </Alert>
              </div>
            ) : null}
          </div>
          <Router hasError={hasError} />
        </Fragment>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default connect(state => ({
  permissions: state.permissions,
  currentUser: state.currentUser,
  assignedIssuer: state.getIssuerDomainMapping
}))(App);
