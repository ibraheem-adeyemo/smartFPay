import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import HorizontalForm from './components/RolesForm';
// import showResults from '../Show';

const RoleForm = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Add Role</h3>
        <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
              information
        </h3>
      </Col>
    </Row>
    <Row>
      <HorizontalForm onSubmit={(values)=> console.log(values)} />
    </Row>
  </Container>
);

export default RoleForm;
