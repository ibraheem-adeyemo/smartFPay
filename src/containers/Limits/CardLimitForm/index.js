import React, { useEffect } from "react";
import {  Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { postCardControl, getControl, resetViewLimitControl } from "../actions/limits.actions";
import HorizontalForm from "./components/CardLimitForm";
import PageHeader from "../../../shared/components/PageHeader";
import { COUNTRIES } from "../../../constants/countries";

const CardLimitForm = ({ dispatch, control, match, customer, history, location }) => {

  const FREQUENCY_OPTIONS = [
    {label: "DAILY", value: "DAILY"},
    {label: "WEEKLY", value: "WEEKLY"},
    {label: "MONTHLY", value: "MONTHLY"}
  ];

  const CHANNELS_OPTIONS = [
    {label: "WEB", value: "WEB"},
    {label: "POS", value: "POS"},
    {label: "ATM", value: "ATM"}
  ]

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

  const addCardControl = values => {
    let requestBody= {
      coreBankingId: customer?.response?.coreBankingId,
      accountNumber: customer?.request,
      ...values
    }

    let controlToken = control?.response?.token||location.state?.accountLimit.token
    dispatch(
      postCardControl(requestBody, controlToken, control.response, history, location)
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
        header={`${location?.state?.cardLimit ? "Edit" : "Add"} Card Limit`}
        subheader="Create new card limit"
      />
      <Row>
        <HorizontalForm
          controlId={match.params.id}
          control={control}
          initialValues={createFormData(control)}
          fetchData={fetchControl}
          onSubmit={addCardControl}
          location={location}
          COUNTRIES={COUNTRIES}
          FREQUENCY_OPTIONS={FREQUENCY_OPTIONS}
          CHANNELS_OPTIONS={CHANNELS_OPTIONS}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  control: state.viewcontrol,
  customer: state.getCustomer
}))(CardLimitForm);
