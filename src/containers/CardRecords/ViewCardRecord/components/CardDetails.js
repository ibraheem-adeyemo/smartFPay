import React, { memo, useEffect } from "react";
import {
  Row,
  Col,
  Spinner,
  Button,
  ButtonToolbar,
  UncontrolledAlert
} from "reactstrap";
import {
  pinReissue,
  blockCard,
  unblockCard,
  pinReissueReset,
  blockCardReset,
  unblockCardReset
} from "../../actions/cardRecords.actions";
import { connect } from "react-redux";
import { appUtils } from "../../../../utils/app.utils";
import { clear } from "../../../Notifications/actions/alert.actions";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";

const CardDetails = memo(
  ({
    cardRecordObject,
    pinReissueState,
    blockCardState,
    unblockCardState,
    notifications,
    dispatch
  }) => {
    useEffect(() => {
      dispatch(clear());
      return () => {
        dispatch(pinReissueReset());
        dispatch(blockCardReset());
        dispatch(unblockCardReset());
        dispatch(clear());
      };
    }, [dispatch]);
    const encryptedPanObj = cardRecordObject && {
      encryptedPan: cardRecordObject.encryptedPan,
      sequenceNumber: cardRecordObject.seqNr,
      issuerNumber: cardRecordObject.issuerNr,
      expiryDate: cardRecordObject.expiryDate
    };

    const handlePinReissue = () => {
      if (cardRecordObject && cardRecordObject.encryptedPan) {
        dispatch(pinReissue(encryptedPanObj));
      }
    };

    const handleBlockCard = () => {
      if (cardRecordObject && cardRecordObject.encryptedPan) {
        dispatch(blockCard(encryptedPanObj));
      }
    };

    const handleUnblockCard = () => {
      if (cardRecordObject && cardRecordObject.encryptedPan) {
        dispatch(unblockCard(encryptedPanObj));
      }
    };
    return (
      <>
        {!!notifications && !appUtils.isEmptyObject(notifications) && (
          <UncontrolledAlert color={notifications.type}>
            <strong>{notifications.title}:</strong> {notifications.message}
          </UncontrolledAlert>
        )}
        <Row>
          <Col sm="6">
            <h5 className="font-weight-bold">Card Information</h5>
            <hr className="my-3" />
            <dl className="row">
              {!!cardRecordObject.nameOnCard && (
                <>
                  <dt className="col-sm-4">Name on Card</dt>
                  <dd className="col-sm-8">
                    <h4 className="font-weight-bold">
                      {cardRecordObject.nameOnCard || "---"}
                    </h4>
                  </dd>
                </>
              )}

              {!!cardRecordObject.maskedPan && (
                <>
                  <dt className="col-sm-4">Masked PAN</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.maskedPan || "---"}</p>
                  </dd>
                </>
              )}

              {!!cardRecordObject.expiryDate && (
                <>
                  <dt className="col-sm-4">Expiry Date</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.expiryDate || "---"}</p>
                  </dd>
                </>
              )}

              {!!cardRecordObject.cvv && (
                <>
                  <dt className="col-sm-4">CVV</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.cvv || "---"}</p>
                  </dd>
                </>
              )}

              {!!cardRecordObject.seqNr && (
                <>
                  <dt className="col-sm-4">Card Sequence</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.seqNr || "---"}</p>
                  </dd>
                </>
              )}

              {!!cardRecordObject.issuerName && (
                <>
                  <dt className="col-sm-4">Issuer Name</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.issuerName || "---"}</p>
                  </dd>
                </>
              )}
            </dl>
          </Col>
          <Col sm="6">
            <h5 className="font-weight-bold">Customer Information</h5>
            <hr className="my-3" />
            <dl className="row">
              {!!cardRecordObject.firstName && (
                <>
                  <dt className="col-sm-4">First Name</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.firstName || "---"}</p>
                  </dd>
                </>
              )}

              {!!cardRecordObject.lastName && (
                <>
                  <dt className="col-sm-4">Last Name</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.lastName || "---"}</p>
                  </dd>
                </>
              )}

              {!!cardRecordObject.emailAddress && (
                <>
                  <dt className="col-sm-4">Email Address</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.emailAddress || "---"}</p>
                  </dd>
                </>
              )}

              {!!cardRecordObject.streetAddress && (
                <>
                  <dt className="col-sm-4">Address</dt>
                  <dd className="col-sm-8">
                    <p>
                      {cardRecordObject.streetAddress}
                      {!!cardRecordObject.streetAddressLine2 && <br />}
                      {cardRecordObject.streetAddressLine2}
                      {!!cardRecordObject.postalCode && <br />}
                      {cardRecordObject.postalCode}
                    </p>
                  </dd>
                </>
              )}
              {!!cardRecordObject.city && (
                <>
                  <dt className="col-sm-4">City</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.city || "---"}</p>
                  </dd>
                </>
              )}
              {!!cardRecordObject.state && (
                <>
                  <dt className="col-sm-4">State</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.state || "---"}</p>
                  </dd>
                </>
              )}
              {!!cardRecordObject.countryCode && (
                <>
                  <dt className="col-sm-4">Country</dt>
                  <dd className="col-sm-8">
                    <p>{cardRecordObject.countryCode || "---"}</p>
                  </dd>
                </>
              )}
            </dl>
          </Col>
        </Row>

        <ButtonToolbar className="form__button-toolbar mb-4">
          {!cardRecordObject.holdRspCode && (
            <AccessControl
              allowedPermissions={[permissionsConstants.REISSUE_PIN]}
              renderNoAccess={() => null}
            >
              <Button
                color="primary"
                type="button"
                className="mb-0"
                id="btn-reset-config"
                disabled={
                  pinReissueState.loading ||
                  blockCardState.loading ||
                  unblockCardState.loading
                }
                onClick={handlePinReissue}
              >
                {!!pinReissueState.loading && <Spinner size="sm" />}
                Pin Re-issue
              </Button>
            </AccessControl>
          )}

          {!cardRecordObject.holdRspCode ? (
            <AccessControl
              allowedPermissions={[permissionsConstants.BLOCK_CARD]}
              renderNoAccess={() => null}
            >
              <Button
                color="danger"
                className="mb-0"
                disabled={
                  pinReissueState.loading ||
                  blockCardState.loading ||
                  unblockCardState.loading
                }
                type="submit"
                id="btn-submit-config"
                onClick={handleBlockCard}
              >
                {!!blockCardState.loading && <Spinner size="sm" />}
                Block Card
              </Button>
            </AccessControl>
          ) : (
            <AccessControl
              allowedPermissions={[permissionsConstants.UNBLOCK_CARD]}
              renderNoAccess={() => null}
            >
              <Button
                color="success"
                className="mb-0"
                type="submit"
                disabled={
                  pinReissueState.loading ||
                  blockCardState.loading ||
                  unblockCardState.loading
                }
                onClick={handleUnblockCard}
                id="btn-submit-config"
              >
                {!!unblockCardState.loading && <Spinner size="sm" />}
                Unblock Card
              </Button>
            </AccessControl>
          )}
        </ButtonToolbar>
      </>
    );
  }
);

export default connect(state => ({
  pinReissueState: state.pinReissue,
  blockCardState: state.blockCard,
  unblockCardState: state.unblockCard,
  notifications: state.notification
}))(CardDetails);
