import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";

import CardRequestsStatsCard from "./components/StatsCard";
import QuickLinks from "./components/QuickLinks"
import PageHeader from "../../shared/components/PageHeader";
import Layout from "../Layout/index";
import { getAllCardRequests } from "../CardRequests/actions/cardrequests.actions";
import { connect } from "react-redux";

const Dashboard = ({dispatch, requests}) =>
{
  useEffect(() => {
    dispatch(getAllCardRequests());
  }, [dispatch]);

  return (
  <main>
    <div>
   <Layout />
   <div className="container__wrap">
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <PageHeader header="Dashboard" />
      </Col>
    </Row>
      <Row>
          <Col md={12} xl={3} lg={6} xs={12}>
            <CardRequestsStatsCard
              bigText="Card Limits"
              smallText="Total processed"
              data={requests?.response?.limitSummary?.totalLimit || "N/A"}
            />
          </Col>
          <Col md={12} xl={3} lg={6} xs={12}>
            <CardRequestsStatsCard
              bigText="Accounts"
              smallText="Accounts Onboard"
              data={requests?.response?.customerSummary?.totalCustomer || "N/A"}
            />
          </Col>
          <Col md={12} xl={3} lg={6} xs={12}>
            <CardRequestsStatsCard
              bigText="Transactions"
              smallText="Total processed"
              data={requests?.response?.transactionSummary?.totalTransactions || "N/A"}
            />
          </Col>
      </Row>
    <Row>
      <QuickLinks />
    </Row>
  </Container></div>
  </div>
  </main>)
}


export default connect(state => ({
  requests: state.getAllCardRequests
}))(Dashboard);
