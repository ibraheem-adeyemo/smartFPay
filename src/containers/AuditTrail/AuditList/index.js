import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import ReportsTable from "./components/ReportsTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getAllAuditReports, downloadAuditReport } from "../actions/audit.actions";

const AuditList = ({ dispatch, allReports }) => {
  const loadReports = requestParams => {
    dispatch(getAllAuditReports(requestParams));
  };

  useEffect(() =>
  {
    loadReports({ pageNumber: 1, pageSize: 10 })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const downloadReports = requestParams => {
    dispatch(downloadAuditReport(requestParams))
  };

  return (
    <Container>
      <PageHeader
        header="Manage Audit Reports"
        subheader="View Audit information"
      />
      <Row>
        <ReportsTable dataState={allReports} fetchData={loadReports} download={downloadReports}/>
      </Row>
    </Container>
  );
};

export default connect(state => ({
  allReports: state.getauditreports
}))(AuditList);
