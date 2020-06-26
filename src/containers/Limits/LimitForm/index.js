import React, { useEffect } from "react";
import {  Container, Row } from "reactstrap";
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { postControl, getControl, resetViewLimitControl } from "../actions/limits.actions";
import HorizontalForm from "./components/LimitForm";
import PageHeader from "../../../shared/components/PageHeader";

const LimitForm = ({ dispatch, control, match, history, customer, location }) => {

  const createFormData = control => {
    let controlData;
    const hasControl =
    match.params.id &&
      control &&
      control.response &&
      control.response.data &&
      control.response.data.length;
    const controlObj = hasControl ? control.response.data[0] : null;
    if (controlObj) {
      controlData = {
        channel: controlObj.channel,
        duration: controlObj.duration,
        frequency: controlObj.frequency,
        amount: controlObj.amount
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
      accountNumber: customer?.request,
      ...values
    }
    
    dispatch(
      postControl(requestBody, match.params.id, control.response, history)
    );
    // console.log('values', values);
    // console.log('match', match);
    // console.log('control', control);
  };

  useEffect(() => {
    if (match.params.id) {
      dispatch(getControl(match.params.id));
    }
    return () => {
      dispatch(resetViewLimitControl());
    };
  }, [dispatch, match.params.id]);

  return (
    <Container>
      <PageHeader
        header={`${match.params.id ? "Edit" : "Add"} Limit`}
        subheader="Create new limit"
      />
      <Row>
        <HorizontalForm
          controlId={match.params.id}
          control={control}
          initialValues={createFormData(control)}
          fetchData={fetchControl}
          onSubmit={addControl}
          location={location}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  control: state.viewcontrol,
  customer: state.getCustomer
}))(withRouter(LimitForm));
