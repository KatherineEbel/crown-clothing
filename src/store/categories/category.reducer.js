import {CATEGORIES_ACTION_TYPES} from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  loading: false,
  error: null,
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {...state, loading: true};
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: payload, loading: false};
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
      return {...state, loading: false, error: payload};
    default: return state;
  }
}