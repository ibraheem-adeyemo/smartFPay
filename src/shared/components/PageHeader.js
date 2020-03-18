import React, { memo } from "react";
import { Col, Row } from "reactstrap";
import { Seo } from "./Seo";
import SeoObject from "../../constants/seo.constants";
const PageHeader = memo(props => {
  const { header, subheader, isBase } = props;
  const seoData = new SeoObject(header, subheader);
  const { title, description } = seoData;
  return (
    <Row>
      <Seo title={title} description={description} base={isBase} />
      <Col md={12}>
        <h3 className="page-title">{header}</h3>
        <h3 className="page-subhead subhead">{subheader}</h3>
      </Col>
    </Row>
  );
});

export default PageHeader;
