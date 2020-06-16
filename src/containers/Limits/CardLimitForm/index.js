import React, { useEffect } from "react";
import {  Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { postCardControl, getControl, resetViewLimitControl } from "../actions/limits.actions";
import HorizontalForm from "./components/CardLimitForm";
import PageHeader from "../../../shared/components/PageHeader";

const CardLimitForm = ({ dispatch, control, match, history }) => {

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

  const addCardControl = values => {
    dispatch(
      postCardControl(values, match.params.id, control.response, history)
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
        header={`${match.params.id ? "Edit" : "Add"} Card Limit`}
        subheader="Create new card limit"
      />
      <Row>
        <HorizontalForm
          controlId={match.params.id}
          control={control}
          initialValues={createFormData(control)}
          fetchData={fetchControl}
          onSubmit={addCardControl}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  control: state.viewcontrol
}))(CardLimitForm);
