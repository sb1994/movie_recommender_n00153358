import * as actionTypes from "../actions/actions";
import { updateStateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const startAuth = (state, action) => {
  return updateStateObject(state, {
    error: null,
    loading: true
  });
};

const successAuth = (state, action) => {
  return updateStateObject(state, {
    token: action.token,
    error: null,
    loading: false
  });
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_AUTH:
      return startAuth(state, action);
    case actionTypes.SUCCESS_AUTH:
      return successAuth(state, action);
    default:
      return state;
  }
};

export default auth;
