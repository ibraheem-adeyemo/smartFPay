import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import PageHeader from "../../shared/components/PageHeader";
import { MdLock } from "react-icons/md";

const NoAccess = ({ allowedPermissions }) => {
  return (
    <Container>
      <PageHeader
        header="No Access"
        subheader="You do not have access to the selected page"
      />
      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="project-summary">
                <div className="text-center">
                  <h4 className="font-weight-bold text-danger">
                    You do not have access to the requested page
                  </h4>
                  <MdLock className="text-muted" size={100} />
                  <p>Please contact your administrator for more details</p>
                  <p>
                    <strong>Required permission(s):</strong>{" "}
                    {allowedPermissions &&
                      allowedPermissions.map(permission => (
                        <span>{permission}</span>
                      ))}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NoAccess;
