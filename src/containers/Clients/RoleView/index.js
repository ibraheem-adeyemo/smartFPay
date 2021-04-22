import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import RoleView from "./components/RoleView";
import PageHeader from "../../../shared/components/PageHeader";

const ViewRole = props => {
  const {location} = props;
  console.log(location)

//   useEffect(() => {
//     if (props.match.params.id) {
//       dispatch(getControl(props.match.params.id));
//     }
//     return () => {
//       dispatch(resetViewLimitControl());
//     };
//   }, [dispatch, props.match.params.id]);

  return (
    <Container>
      <PageHeader header="View Role" subheader="View role information" />
      <Row>
        <RoleView
          location={location}
        />
      </Row>
    </Container>
  );
};

export default ViewRole;
