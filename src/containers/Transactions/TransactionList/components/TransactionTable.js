/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";

import { MdInsertDriveFile } from "react-icons/md";
import DataTable from "../../../../shared/components/DataTable";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getFormValues } from "redux-form";
import CustomFilter from "./CustomFilter";
import {createFilterRequestBody} from "../../factories/transactions.factory";


const TransactionsTable = props => {
  const {
    dataState,
    fetchData,
    permissions,
    allTransactions,
    download,
    values
  } = props;

  const count = dataState && dataState.response ? dataState.response.count : 0;
  const [initialFetch, setInitialFetch] = useState(false);

  const columns = [
    {
      accessor: "limitId",
      name: "Limit ID",
    },
    {
      accessor: "fromAccount",
      name: "Sender's Account",
    },
    {
        accessor: "paymentType",
        name: "Payment Type",
    },
    {
        accessor: "terminalId",
        name: "Terminal ID",
    },
    {
      accessor: "channel",
      name: "Channel",
    },
    {
        accessor: "customerName",
        name: "Customer Name",
    },
    {
        accessor: "country",
        name: "Country",
    },
  ];

  const handleAction = (row, action) => {
    if (action.name === "view_transaction") {
      props.history.push(
        {
          pathname:`${'/view-transactions'}/view/${row.limitId}`,
          state: {transaction: row}
        }
      );
    }
  };

  const sortFn = (pageNum, pageSize, column) => {
    if (!allTransactions.loading) {
      fetchData({
        ...allTransactions.request,
        pageNum,
        pageSize,
      });
    }
  };

  const actions = [
    {
      name: "view_transaction",
      btnText: "View",
      btnAction: handleAction,
      btnClass: "success",
      btnIcon: MdInsertDriveFile,
      permissions: []
    },
  ];

  const handleFilter = (isReset) => {
    let requestBody = isReset ? {} : createFilterRequestBody({
        limitId: values.limitId,
        tokenizedPan: values.tokenizedPan,
        decline: values.decline,
        startDate: values.startDate,
        endDate: values.endDate,
        accountNumber: values.accountNumber,
        channel: values.channel,
        violationCode: values.violationCode,
        customerName: values.customerName,
        country: values.country,
        paymentType: values.paymentType,
        maskedPan: values.maskedPan,
        status: values.status
      });
    fetchData({
      pageSize: dataState.request?.pageSize || 10,
      pageNumber: 1,
      ...requestBody
    });
    setInitialFetch(true);
  };

  useEffect(() => {
    if (!initialFetch && values)
      handleFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const handleDownload = () => {
    let requestBody = createFilterRequestBody({
      limitId: values.limitId,
      tokenizedPan: values.tokenizedPan,
      decline: values.decline,
      startDate: values.startDate,
      endDate: values.endDate,
      accountNumber: values.accountNumber,
      channel: values.channel,
      violationCode: values.violationCode,
      customerName: values.customerName,
      country: values.country,
      paymentType: values.paymentType,
      maskedPan: values.maskedPan
    });
    download({
      ...dataState.request,
      pageNumber: 1,
      ...requestBody
    });
  }; 

  const loadData = (pageNumber, pageSize) => {
    fetchData({ ...allTransactions.request, pageNumber, pageSize });
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Transactions</h5>
          </div>
          <DataTable
            columns={columns}
            loading={dataState && dataState.loading}
            data={
              dataState && dataState.response ? dataState.response.data : []
            }
            count={count}
            countName="Transactions"
            defaultPageSize={10}
            defaultPageNumber={1}
            loadData={loadData}
            error={dataState && dataState.error}
            bordered={true}
            striped={true}
            hover={true}
            permissions={permissions}
            actions={actions}
            responsive
            customSearch={
              <CustomFilter
                pageNumber={1}
                initialValues={{
                  pageNumber: 1,
                  pageSize: 10,
                  limitId: "",
                  tokenizedPan: "",
                  decline: "",
                  startDate: "",
                  endDate: "",
                  accountNumber: "",
                  channel: "",
                  violationCode: "",
                  customerName: "",
                  country: "",
                  paymentType: "",
                  maskedPan: ""
                }}
                pageSize={10}
                handleFilter={handleFilter}
                handleDownload={handleDownload}
              />
            }
            sortFn={sortFn}
            serverside
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default connect(state => ({
  values: getFormValues("transactions_custom_filter")(state),
  permissions: state.permissions && state.permissions.response,
  allTransactions: state.gettransactionreport
}))(withRouter(TransactionsTable));
