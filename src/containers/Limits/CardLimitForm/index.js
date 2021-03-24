import React, { useEffect } from "react";
import {  Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { postCardControl, getControl, resetViewLimitControl } from "../actions/limits.actions";
import HorizontalForm from "./components/CardLimitForm";
import PageHeader from "../../../shared/components/PageHeader";
import { COUNTRIES } from "../../../constants/countries";
import {FREQUENCY_OPTIONS, CARD_STATUS_OPTIONS} from '../../../constants/app.constants';
import "antd/dist/antd.css"

const CardLimitForm = ({ dispatch, control, match, customer, history, location }) => {

  const formatDate = (dateString) => {
    if(!dateString){
      return null;
    }
    let dateCharacters = dateString.split('');
      let temp = dateCharacters[0];
      dateCharacters[0] = dateCharacters[3];
      dateCharacters[3] = temp;
      temp = dateCharacters[1];
      dateCharacters[1] = dateCharacters[4];
      dateCharacters[4] = temp;

      return new Date(dateCharacters.join(''));
  }

  const createFormData = control => {
    let controlData;
    const hasControl =
    (match.params.id && control?.response);
    const controlObj = hasControl ? (control.response) : null;
    let channels=[], countries=[], countryCount = 0, channelsCount = 0;
    if (controlObj) {
      if(controlObj.enabledCountries) {
        for(var country of controlObj.enabledCountries.split(',')) {
          countries[countryCount++] = {name: country,alpha3Code: country};
        }
      }
      if(controlObj.enabledChannels){
        for(var channel of controlObj.enabledChannels.split(',')) {
          channels[channelsCount++] = {label: channel,value: channel};
        }
      }
      controlData = {
        token: controlObj.token,
        duration: controlObj.duration || controlObj.transactionLimitCount,
        frequency: FREQUENCY_OPTIONS.find(
          frequency => frequency.value === controlObj.frequencyLimitReset
        ),
        amount: controlObj.transactionLimitAmount,
        startDate: formatDate(controlObj.limitStartDate),
        endDate: formatDate(controlObj.limitEndDate),
        cardStatus: CARD_STATUS_OPTIONS.find(
          status => status.value === controlObj.cardStatus
        ),
        channels: channels,
        enabledCountries: countries
      };
    }
    return controlData;
  };

  function fetchControl() {
    dispatch(getControl(match.params.id));
  }

  const addCardControl = values => {
    const card = location.state?.cardDetails? location.state?.cardDetails : control.response;
    let requestBody= {
      coreBankingId: customer?.response?.coreBankingId,
      accountNumber: location.state?.fromCustomerView ? customer?.request : control.response.accountNumber,
      tokenizedPan: card.tokenizedPan || card.token,
      cardExpiryNumber: card.expiry || card.cardExpiryNumber,
      cardMaskedPan: card.pan || card.cardMaskedPan,
      ...values
    }

    // let controlToken = control?.response?.token||
    let controlToken = match.params.id;
    dispatch(
      postCardControl(requestBody, controlToken, control.response, history, location)
    );
  };

  useEffect(() => {
    if (match.params.id) {
      dispatch(getControl(match.params.id));
    }
    // return () => {
    //   dispatch(resetViewLimitControl());
    // };
  }, [dispatch, match.params.id]);

  return (
    <Container>
      <PageHeader
        header={`${match.params.id ? `Edit card limit` : "Add Card Limit"}`}
        subheader={`${match.params.id ? "Update existing" : "Create new"} card limit`}
      />
      <Row>
        <HorizontalForm
          controlId={match.params.id}
          control={control}
          initialValues={createFormData(control)}
          fetchData={fetchControl}
          onSubmit={addCardControl}
          location={location}
          COUNTRIES={COUNTRIES}
          FREQUENCY_OPTIONS={FREQUENCY_OPTIONS}
        />
      </Row>
    </Container>
  );
};

export default connect(state => ({
  control: state.viewcontrol,
  customer: state.getCustomer
}))(CardLimitForm);
