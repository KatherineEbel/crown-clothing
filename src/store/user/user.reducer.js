import {USER_ACTION_TYPES} from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
}

const {
  EMAIL_SIGNIN_START,
  EMAIL_SIGNUP_START,
  GOOGLE_SIGNIN_START,
  GOOGLE_SIGNUP_START,
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_FAIL,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAIL
} = USER_ACTION_TYPES;

export const userReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case EMAIL_SIGNIN_START:
    case EMAIL_SIGNUP_START:
    case GOOGLE_SIGNIN_START:
    case GOOGLE_SIGNUP_START:
      return {...state, loading: true }
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {...state, currentUser: payload, loading: false}
    case SIGNIN_FAIL:
    case SIGNUP_FAIL:
    case SIGN_OUT_FAIL:
      return {...state, error: payload, loading: false}
    case SIGN_OUT_SUCCESS:
      return {...state, currentUser: null, loading: false}
    default:
      return state;
  }
}

