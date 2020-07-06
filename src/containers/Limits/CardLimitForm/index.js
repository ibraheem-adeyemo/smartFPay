import React, { useEffect } from "react";
import {  Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { postCardControl, getControl, resetViewLimitControl } from "../actions/limits.actions";
import HorizontalForm from "./components/CardLimitForm";
import PageHeader from "../../../shared/components/PageHeader";
import { COUNTRIES } from "../../../constants/countries";
import {FREQUENCY_OPTIONS, CARD_STATUS_OPTIONS} from '../../../constants/app.constants';

const CardLimitForm = ({ dispatch, control, match, customer, history, location }) => {

  const formatDate = (dateString) => {
    let dateCharacters = dateString.split('');
      let temp = dateCharacters[0];
      dateCharacters[0] = dateCharacters[3];
      dateCharacters[3] = temp;
      temp = dateCharacters[1];
      dateCharacters[1] = dateCharacters[4];
      dateCharacters[4] = temp;

      return dateCharacters.join('');
  }

  const createFormData = control => {
    let controlData;
    const hasControl =
    (match.params.id && control?.response);
    const controlObj = hasControl ? (control.response) : null;
    let channels=[], countries=[], countryCount = 0, channelsCount = 0;
    console.log('channels', channels)
    if (controlObj) {
      console.log('controlObj', controlObj);
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
          frequency => frequency.label === controlObj.frequencyLimitReset
        ),
        amount: controlObj.transactionLimitAmount,
        startDate: new Date(formatDate(controlObj.limitStartDate)),
        endDate: new Date(formatDate(controlObj.limitEndDate)),
        cardStatus: CARD_STATUS_OPTIONS.find(
          status => status.label === controlObj.cardStatus
        ),
        channels: channels,
        enabledCountries: countries
      };
      console.log('Control Data', controlData)
    }

    return controlData;
  };

  function fetchControl() {
    console.log(match.params.id)
    dispatch(getControl(match.params.id));
  }

  const addCardControl = values => {
    const card = location.state?.cardDetails;
    let requestBody= {
      coreBankingId: customer?.response?.coreBankingId,
      accountNumber: customer?.request,
      tokenizedPan: card.tokenizedPan,
      cardExpiryNumber: card.expiry,
      cardMaskedPan: card.pan,
      ...values
    }

    // let controlToken = control?.response?.token||
    let controlToken = match.params.id;
    dispatch(
      postCardControl(requestBody, controlToken, control.response, history, location)
    );
  };

  useEffect(() => {
    console.log(match.params.id)
    console.log(location.state.cardDetails)
    if (match.params.id) {
      dispatch(getControl(match.params.id));
    }
    // return () => {
    //   dispatch(resetViewLimitControl());
    // };
  }, [dispatch, match.params.id]); 
  console.log(control, location)

  return (
    <Container>
      <PageHeader
        header={`${match.params.id ? "Edit" : "Add"} Card Limit`}
        subheader="Create new card limit"
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
