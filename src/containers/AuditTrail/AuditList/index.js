import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import ReportsTable from "./components/ReportsTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getAllAuditReports } from "../actions/audit.actions";

const AuditList = ({ dispatch, allReports }) => {
  const loadReports = requestParams => {
    dispatch(getAllAuditReports(requestParams));
  };

  useEffect(() => {
    dispatch(getAllAuditReports({ pageNum: 1, pageSize: 10 }));
  }, [dispatch]);

  return (
    <Container>
      <PageHeader
        header="Manage Reports"
        subheader="View Audit information"
      />
      <Row>
        <ReportsTable dataState={allReports} fetchData={loadReports} />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  allReports: state.getauditreports
}))(AuditList);
