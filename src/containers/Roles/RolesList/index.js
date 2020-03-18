import React from "react";
import { Container, Row } from "reactstrap";
import RolesTable from "./components/RolesTable";
import PageHeader from "../../../shared/components/PageHeader";
const RolesList = () => (
  <Container>
    <PageHeader header="Manage Roles" subheader="Create and Modify Roles information" />
    <Row>
      <RolesTable />
    </Row>
  </Container>
);

export default RolesList;
