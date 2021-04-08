import React from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import TransactionTable from "./components/TransactionTable";
import PageHeader from "../../../shared/components/PageHeader";
import { getAllTransactions, downloadTransactionReport } from "../actions/transactions.actions";

const TransactionList = ({ dispatch, allTransactions }) => {
  const loadReports = requestParams => {
    dispatch(getAllTransactions(requestParams));
  };

  const downloadReports = requestParams => {
    dispatch(downloadTransactionReport(requestParams))
  };

  return (
    <Container>
      <PageHeader
        header="Manage Transactions"
        subheader="View Transaction information"
      />
      <Row>
        <TransactionTable dataState={allTransactions} fetchData={loadReports} download={downloadReports}/>
      </Row>
    </Container>
  );
};

export default connect(state => ({
  allTransactions: state.gettransactionreport
}))(TransactionList);
