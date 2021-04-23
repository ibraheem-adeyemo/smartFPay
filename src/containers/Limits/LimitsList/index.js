import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import LimitsTable from "./components/LimitsTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getAllControls, downloadControls } from "../actions/limits.actions";

const LimitsList = ({ dispatch, allControls, match }) => {
  const loadControls = requestParams => {
    dispatch(getAllControls(requestParams));
  };

  const downloadControlData = requestParams => {
    dispatch(downloadControls(requestParams))
  };

  useEffect(() =>
  {
    loadControls({ pageSize: 10, pageNumber: 1 })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <PageHeader
        header="Manage Controls"
        subheader="Manage Limit Controls"
      />
      <Row>
        <LimitsTable dataState={allControls} fetchData={loadControls} download={downloadControlData}/>
      </Row>
    </Container>
  );
};

export default connect(state => ({
  allControls: state.getcontrols
}))(LimitsList);
