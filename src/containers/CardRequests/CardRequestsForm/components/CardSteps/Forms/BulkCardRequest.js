import React from "react";
import { Row, Col, Alert } from "reactstrap";
import { Field } from "redux-form";
import renderFileInputField from "../../../../../../shared/components/form/FileInput";
import { BATCH_UPLOAD_TEMPLATE, MAX_BATCH_FILE_SIZE } from "../../../../../../constants/app.constants";
import { appUtils } from "../../../../../../utils/app.utils";

const BulkCardRequest = () => {
  return (
    <div id="bulk-card-request">
      <Row>
        <Col lg="5">
          <div className="form__form-group">
            <span className="form__form-group-label required">
              Bulk Upload File (
              <a target="blank" href={BATCH_UPLOAD_TEMPLATE}>Download Bulk upload template</a>)
            </span>
            <div className="form__form-group-field">
              <Field
                id="excelFile"
                name="excelFile"
                accept=".xlsx"
                component={renderFileInputField}
              />
            </div>
          </div>
          <Alert color="info">
              <h5 className="font-weight-bold">Rules</h5>
              <ul>
                <li><a target="blank" href={BATCH_UPLOAD_TEMPLATE}>Download Bulk upload template</a></li>
                <li>Fill out the customer information (Maximum of 500 rows/request)</li>
                <li>Upload the populated excel template to proceed</li>
              </ul>
              <p>*File must be in '.xlsx' and must not be larger than {appUtils.byteConverter(MAX_BATCH_FILE_SIZE)}</p>
          </Alert>
        </Col>
      </Row>
    </div>
  );
};

export default BulkCardRequest;
