import React, { Fragment } from "react";
import { Alert } from "reactstrap";

const FormError = ({ formState }) => {
  return (
    <Fragment>
      {formState && formState.error && !formState.loading ? (
        <Alert color="danger">
          {formState.error.message && <h4>{formState.error.message}</h4>}
          {formState.error.errors &&
            formState.error.errors.map((err, index) => (
              <p key={index}>{err.message}</p>
            ))}
        </Alert>
      ) : null}
    </Fragment>
  );
};

export default FormError;
