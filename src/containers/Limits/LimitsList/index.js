import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import LimitsTable from "./components/LimitsTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getAllControls } from "../actions/limits.actions";

const LimitsList = ({ dispatch, allControls, match }) => {
  const loadControls = requestParams => {
    dispatch(getAllControls(requestParams));
  };

  useEffect(() => {
    dispatch(getAllControls({...allControls.request}));
  }, [dispatch]);

  return (
    <Container>
      <PageHeader
        header="Manage Controls"
        subheader="Manage Limit Controls"
      />
      <Row>
        <LimitsTable dataState={allControls} fetchData={loadControls} />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  allControls: state.getcontrols
}))(LimitsList);
