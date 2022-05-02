import {CART_ACTION_TYPES} from "./cart.types";

const { CLEAR, SET_CART_ITEMS, SET_OPEN} = CART_ACTION_TYPES

const INITIAL_STATE = {
  items: {},
  open: false,
}

export const cartReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_CART_ITEMS:
      return {
        ...state,
        items: payload,
      }
    case SET_OPEN:
      return {...state, open: payload}
    case CLEAR:
      return {...state, items: {}}
    default: return state;
  }
}

