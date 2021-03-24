import React, { useEffect } from "react";
import {  Container, Row } from "reactstrap";
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { postControl, getControl, resetViewLimitControl } from "../actions/limits.actions";
import HorizontalForm from "./components/LimitForm";
import PageHeader from "../../../shared/components/PageHeader";
import {FREQUENCY_OPTIONS} from '../../../constants/app.constants';

const LimitForm = ({ dispatch, control, match, history, customer, location }) => {

  const formatDate = (dateString) => {
    if(!dateString){
      return null;
    }
    let dateCharacters = dateString.split('');
      let temp = dateCharacters[0];
      dateCharacters[0] = dateCharacters[3];
      dateCharacters[3] = temp;
      temp = dateCharacters[1];
      dateCharacters[1] = dateCharacters[4];
      dateCharacters[4] = temp;

      return new Date(dateCharacters.join(''));
  }

  const createFormData = control => {
    let controlData;
    const hasControl =
    (match.params.id && control?.response);
    const controlObj = hasControl ? (control.response) : null;
    if (controlObj) {
      controlData = {
        token: controlObj.token,
        duration: controlObj.duration || controlObj.transactionLimitCount,
        frequency: FREQUENCY_OPTIONS.find(
          frequency => frequency.label === controlObj.frequencyLimitReset
        ),
        amount: controlObj.transactionLimitAmount,
        interbankTransaction: controlObj.interbankTransaction,
        startDate: formatDate(controlObj.limitStartDate),
        endDate: formatDate(controlObj.limitEndDate)
      };
    }

    return controlData;
  };

  function fetchControl() {
    dispatch(getControl(match.params.id));
  }

  const addControl = values => {
    let requestBody= {
      coreBankingId: customer?.response?.coreBankingId,
      accountNumber: location.state?.fromCustomerView ? customer?.request : control.response.accountNumber,
      ...values
    }

    let controlToken = match.params.id;
    dispatch(
      postControl(requestBody, controlToken, control.response, history, location)
    );
  };
  

  useEffect(() => {
    if (match.params.id) {
      dispatch(getControl(match.params.id));
    }
    // return () => {
    //   dispatch(resetViewLimitControl());
    // };
  }, [dispatch, match.params.id]);

  return (
    <Container>
      <PageHeader
        header={`${match.params.id ? `Edit account limit` : "Add Account Limit"}`}
        subheader={`${match.params.id ? "Update existing" : "Create new"} account limit`}
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
