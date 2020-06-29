import React, { useEffect } from "react";
import {  Container, Row } from "reactstrap";
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { postControl, getControl, resetViewLimitControl } from "../actions/limits.actions";
import HorizontalForm from "./components/LimitForm";
import PageHeader from "../../../shared/components/PageHeader";

const LimitForm = ({ dispatch, control, match, history, customer, location }) => {

  const FREQUENCY_OPTIONS = [
    {label: "DAILY", value: "DAILY"},
    {label: "WEEKLY", value: "WEEKLY"},
    {label: "MONTHLY", value: "MONTHLY"}
  ];

  const createFormData = control => {
    let controlData;
    const hasControl =
    (match.params.id &&
      control &&
      control.response &&
      control.response.data &&
      control.response.data.length) || location.state?.accountLimit;
    const controlObj = hasControl ? (control.response?.data?.[0]||location.state?.accountLimit) : null;
    if (controlObj) {
      console.log('controlObj', controlObj);
      controlData = {
        token: controlObj.token,
        duration: controlObj.duration || controlObj.transactionLimitCount,
        frequency: FREQUENCY_OPTIONS.find(
          frequency => frequency.label === controlObj.frequencyLimitReset
        ),
        amount: controlObj.transactionLimitAmount,
        interbankTransaction: controlObj.interbankTransaction,
        // startDate: controlObj.createdDate,
        // endDate: controlObj.limitEndDate?.substring(0, 10)
      };
      console.log('Control Data', controlData)
    }

    return controlData;
  };

  function fetchControl() {
    dispatch(getControl(match.params.id));
  }

  const addControl = values => {
    let requestBody= {
      coreBankingId: customer?.response?.coreBankingId,
      accountNumber: customer?.request,
      ...values
    }

    let controlToken = control?.response?.token||location.state?.accountLimit.token
    dispatch(
      postControl(requestBody, controlToken, control.response, history, location)
    );
    // console.log('values', values);
    // console.log('match', match);
    // console.log('control', control);
  };

  useEffect(() => {
    if (match.params.id) {
      dispatch(getControl(match.params.id));
    }
    // return () => {
    //   dispatch(resetViewLimitControl());
    // };
  }, [dispatch, match.params.id]);
    
  console.log(control, location)

  return (
    <Container>
      <PageHeader
        header={`${location?.state?.accountLimit ? "Edit" : "Add"} Account Limit`}
        subheader={`${location?.state?.accountLimit ? "Update existing" : "Create new"} account limit`}
      />
      <Row>
        <HorizontalForm
          controlId={match.params.id}
          control={control}
          initialValues={createFormData(control)}
          fetchData={fetchControl}
          onSubmit={addControl}
          location={location}
          FREQUENCY_OPTIONS={FREQUENCY_OPTIONS}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  control: state.viewcontrol,
  customer: state.getCustomer
}))(withRouter(LimitForm));
