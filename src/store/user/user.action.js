import {createAction} from "../../utils/reducer/reducer.utils";
import {USER_ACTION_TYPES} from "./user.types";

const {
  CHECK_USER_SESSION,
  GOOGLE_SIGNUP_START,
  GOOGLE_SIGNIN_START,
  EMAIL_SIGNUP_START,
  EMAIL_SIGNIN_START,
  SIGNIN_FAIL,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAIL,
} = USER_ACTION_TYPES;
export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(GOOGLE_SIGNIN_START);
export const emailSignInStart = (email, password) => createAction(EMAIL_SIGNIN_START, {
  email,
  password
});

export const googleSignUpStart = () => createAction(GOOGLE_SIGNUP_START);
export const emailSignUpStart = (email, password, displayName) => createAction(EMAIL_SIGNUP_START, {
  email,
  password,
  displayName,
});

export const signInSuccess = (user) => createAction(SIGNIN_SUCCESS, user);
export const signUpSuccess = (user) => createAction(SIGNUP_SUCCESS, user)
export const signUpFail = (error) => createAction(SIGNUP_FAIL, error)
export const signInFail = (error) => createAction(SIGNIN_FAIL, error);
export const signOutStart = () => createAction(SIGN_OUT_START)
export const signOutSuccess = () => createAction(SIGN_OUT_SUCCESS)
export const signOutFail = (error) => createAction(SIGN_OUT_FAIL, error)
