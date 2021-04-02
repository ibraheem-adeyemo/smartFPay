import React, { useState } from "react";
import { 
  Card,
  CardBody,
  Row,
  Col,
  Button,
  ButtonToolbar,
  UncontrolledAlert,
Spinner } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import renderSelectField from "../../../../shared/components/form/Select";
import validate from "./validate";
import { CHANNELS_OPTIONS } from "../../../../constants/app.constants";

const ChannelTokenForm = props => {
  const {
    handleSubmit,
    reset,
    pristine,
    invalid,
    submitting,
    generatechanneltoken,
    disabled, } = props;

    const [justCopied, setJustCopied] = useState(false);

  // useEffect(() => {
  //   dispatch(resetChannelToken());
  //   return () => {
  //     dispatch(resetChannelToken());
  //   };
  // }, [dispatch]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatechanneltoken.response?.token)
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 1300)
  }

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <form className="form" onSubmit={handleSubmit}>
          {generatechanneltoken?.error?.errors?.length ? (
                    <UncontrolledAlert color="danger">
                      <h5 className="font-weight-bold">
                        Please check that a correct channel was entered
                      </h5>
                      
                    </UncontrolledAlert>
                  ) : null}
            <Row>
              <Col lg="4">
                <div className="form__form-group">
                  <span className="form__form-group-label required">Channels</span>
                  <div className="form__form-group-field">
                    <Field
                      id = "channel"
                      name="channel"
                      component={renderSelectField}
                      disabled={disabled}
                      isMulti={true}
                      options={CHANNELS_OPTIONS}
                      placeholder="Select channels"
                      isClearable
                      valueKey="value"
                      labelKey="label"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <ButtonToolbar className="form__button-toolbar">
              <Button type="button" onClick={reset}
                      disabled={pristine || submitting}>
                Cancel
              </Button>
              <Button color="primary" type="submit"
                      disabled={submitting || invalid}>
              {generatechanneltoken?.loading ? (
                        <span>
                          <Spinner size="sm" color="default" />{" "}
                        </span>
                      ) : null}
                      Generate
              </Button>
            </ButtonToolbar>
          </form>

              {
                generatechanneltoken.response?.token &&
                <div className="generated-token-wrapper">
                  <span className="generated-token">
                    {generatechanneltoken.response?.token}
                  </span>
                  <Button
                    color={justCopied ? "success" : "primary"}
                    type="button"
                    onClick={copyToClipboard}
                    outline
                    size="sm"
                  >
                    {justCopied ? "Copied!" : "Copy to Clipboard"}
                  </Button>
                </div>
              }
        </CardBody>
      </Card>
    </Col>
  );
};

ChannelTokenForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default reduxForm({
  form: "channel_token_form",
  validate,
  enableReinitialize: true
})(
  connect(state => ({
    generatechanneltoken: state.generatechanneltoken,
  }))(ChannelTokenForm)
);
