import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesFail, fetchCategoriesSuccess} from "./category.action";
import {takeLatest, all, call, put} from 'redux-saga/effects';
import {CATEGORIES_ACTION_TYPES} from "./category.types";


export function* fetchCategoriesAsync() {
  try {
    const categories = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categories))
  } catch (e) {
    yield put(fetchCategoriesFail(e))
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]) // complete all before continuing
}