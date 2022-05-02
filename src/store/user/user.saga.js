import {takeLatest, put, all, call} from 'redux-saga/effects';
import {USER_ACTION_TYPES} from "./user.types";
import {
  signInSuccess,
  signInFail,
  signUpSuccess,
  signUpFail,
  signOutFail,
  signOutSuccess
} from "./user.action";
import {
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup, getUserDoc, createAuthUserWithEmailAndPassword, signOutAuthUser
} from "../../utils/firebase/firebase.utils";

const {
  CHECK_USER_SESSION,
  EMAIL_SIGNIN_START,
  GOOGLE_SIGNIN_START,
  GOOGLE_SIGNUP_START,
  EMAIL_SIGNUP_START,
  SIGN_OUT_START,
} = USER_ACTION_TYPES

export function* getSnapshotFromAuth(userAuth) {
  try {
    const userSnapshot = yield call(getUserDoc, userAuth.uid);
    if (!userSnapshot) {
      yield signInFail('User doesn\'t exist')
    } else {
      yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }
  } catch (e) {
    yield put(signInFail(e))
  }
}

export function* authenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return null;
    yield call(getSnapshotFromAuth, userAuth);
  } catch (e) {
    yield put(signInFail(e))
  }
}

export function* signInWithGoogle() {
  try {
    let user = yield call(signInWithGooglePopup);
    yield put(signInSuccess(user))
  } catch (e) {
    yield put(signInFail(e))
  }
}

export function* signUpWithGoogle() {
  try {
    let user = yield call(signInWithGooglePopup);
    yield put(signUpSuccess(user))
  } catch (e) {
    yield put(signUpFail(e))
  }
}

export function* signInWithEmail({payload: {email, password}}) {
  try {
    let userSnapshot = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
  } catch (e) {
    yield put(signInFail(e))
  }
}

export function* signUpWithEmail({payload: {email, password, displayName}}) {
  try {
    let userSnapshot = yield call(createAuthUserWithEmailAndPassword, email, password, displayName);
    yield put(signUpSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
  } catch (e) {
    yield put(signUpFail(e))
  }
}

export function* signOut() {
  try {
    yield call(signOutAuthUser)
    yield put(signOutSuccess())
  } catch (e) {
    yield put(signOutFail(e))
  }
}

// entry points (triggers)
export function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, authenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(GOOGLE_SIGNIN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(EMAIL_SIGNIN_START, signInWithEmail);
}

export function* onGoogleSignUpStart() {
  yield takeLatest(GOOGLE_SIGNUP_START, signUpWithGoogle);
}

export function* onEmailSignUpStart() {
  yield takeLatest(EMAIL_SIGNUP_START, signUpWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onGoogleSignUpStart),
    call(onEmailSignUpStart),
    call(onSignOutStart),
  ]);
}
