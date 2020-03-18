import { createCRUDConstants } from "../redux.utils";

describe(`CREATECRUD Constants`, () => {
  const nameSpace = "USERS";
  it(`create CREATE CONSTANTS`, () => {
    expect(createCRUDConstants(nameSpace, ["DELETE"])).toEqual({
      GET_USERS_REQUEST: `GET_${nameSpace}_REQUEST`,
      GET_USERS_SUCCESS: `GET_${nameSpace}_SUCCESS`,
      GET_USERS_FAILURE: `GET_${nameSpace}_FAILURE`,
      GET_USERS_RESET: `GET_${nameSpace}_RESET`,

      VIEW_USERS_REQUEST: `VIEW_${nameSpace}_REQUEST`,
      VIEW_USERS_SUCCESS: `VIEW_${nameSpace}_SUCCESS`,
      VIEW_USERS_FAILURE: `VIEW_${nameSpace}_FAILURE`,
      VIEW_USERS_RESET: `VIEW_${nameSpace}_RESET`,

      POST_USERS_REQUEST: `POST_${nameSpace}_REQUEST`,
      POST_USERS_SUCCESS: `POST_${nameSpace}_SUCCESS`,
      POST_USERS_FAILURE: `POST_${nameSpace}_FAILURE`,
      POST_USERS_RESET: `POST_${nameSpace}_RESET`,

      DELETE_USERS_REQUEST: `DELETE_${nameSpace}_REQUEST`,
      DELETE_USERS_SUCCESS: `DELETE_${nameSpace}_SUCCESS`,
      DELETE_USERS_FAILURE: `DELETE_${nameSpace}_FAILURE`,
      DELETE_USERS_RESET: `DELETE_${nameSpace}_RESET`,

    });
  });
});
