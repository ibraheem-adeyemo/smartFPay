import React from "react";
import { Col, Container, Row } from "reactstrap";

import CardRequestsStatsCard from "./components/StatsCard";
import QuickLinks from "./components/QuickLinks"
import PageHeader from "../../shared/components/PageHeader";

const Dashboard = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <PageHeader header="Dashboard" />
      </Col>
    </Row>
      <Row>
          <Col md={12} xl={3} lg={6} xs={12}>
            <CardRequestsStatsCard bigText="Card Limits" smallText="Total processed" />
          </Col>
          <Col md={12} xl={3} lg={6} xs={12}>
            <CardRequestsStatsCard bigText="Accounts" smallText="Accounts Onboard" />
          </Col>
          <Col md={12} xl={3} lg={6} xs={12}>
            <CardRequestsStatsCard bigText="Active Limits" smallText="Accounts processed" />
          </Col>
      </Row>
    <Row>
      <QuickLinks />
    </Row>
  </Container>
);

export default Dashboard;