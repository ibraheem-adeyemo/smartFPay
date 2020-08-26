import React, { memo, useEffect } from "react";
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
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { renderField } from "../../../../utils/renderfield";
import { resetChannelToken } from "../../actions/token.actions";
import validate from "./validate";

const ChannelTokenForm = memo(props => {
  const {
    permissions,
    dispatch,
    handleSubmit,
    reset,
    pristine,
    invalid,
    submitting,
    generatechanneltoken,
    disabled, } = props;

  const resetForm = () => {
    reset();
  }

  // useEffect(() => {
  //   dispatch(resetChannelToken());
  //   return () => {
  //     dispatch(resetChannelToken());
  //   };
  // }, [dispatch]);

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">
              <Link to="/roles">
                <MdArrowBack size={20} /> Back to roles
              </Link>
            </h5>
          </div>
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
                  <span className="form__form-group-label required">Channel</span>
                  <div className="form__form-group-field">
                    <Field
                      id = "channel"
                      name="channnel"
                      component={renderField}
                      disabled={disabled}
                      type="text"
                      placeholder="Channel"
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
        </CardBody>
      </Card>
    </Col>
  );
});

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
