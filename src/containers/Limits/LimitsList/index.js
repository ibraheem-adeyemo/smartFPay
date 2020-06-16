import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import LimitsTable from "./components/LimitsTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getAllControls } from "../actions/limits.actions";

const LimitsList = ({ dispatch, allControls }) => {
  const loadControls = requestParams => {
    dispatch(getAllControls(requestParams));
  };

  useEffect(() => {
    dispatch(getAllControls({ pageNum: 1, pageSize: 10 }));
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
