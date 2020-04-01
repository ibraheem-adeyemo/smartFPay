import { cardProgramsConstants, card_programs_nameSpace } from "../../Issuers/constants/issuers.constants";

const initialState={
    loading: false,
    success: false,
    request: null,
    response: null,
    error: null 
};

export const getCardProgramsFromIssuer= (state = initialState, action) => {
    switch (action.type) {
      case  cardProgramsConstants[`GET_${card_programs_nameSpace}_REQUEST`]:
        return {
          ...state,
          loading: true,
          response: null,
          request: action.request
        };
      case  cardProgramsConstants[`GET_${card_programs_nameSpace}_SUCCESS`]:
        return {
          ...state,
          loading: false,
          success: true,
          response: action.response,
          error: null
        };
      case  cardProgramsConstants[`GET_${card_programs_nameSpace}_FAILURE`]:
        return {
          ...state,
          loading: false,
          success: false,
          response: null,
          error: action.error
        };
      case  cardProgramsConstants[`GET_${card_programs_nameSpace}_RESET`]:
        return {
          ...state,
          ...initialState
        };
      default:
        return state;
    }
  };