import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import LimitView from "./components/LimitView";
import PageHeader from "../../../shared/components/PageHeader";
import { getControl, resetViewLimitControl } from "../actions/limits.actions";

const ViewLimit = props => {
  const { dispatch, control } = props;

  function fetchControl() {
    dispatch(getControl(props.match.params.id));
  }

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(getControl(props.match.params.id));
    }
    return () => {
      dispatch(resetViewLimitControl());
    };
  }, [dispatch, props.match.params.id]);

  return (
    <Container>
      <PageHeader header="View Control" subheader="View limit control information" />
      <Row>
        <LimitView
          userId={props.match.params.id}
          control={control}
          fetchData={fetchControl}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  control: state.viewcontrol
}))(ViewLimit);
