import {createSelector} from "reselect";

const itemCount = (items) => {
  return Object.values(items).reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
}

const total = (items) => {
  return Object.values(items).reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0)
}

const selectCartReducer = state => state.cart;

export const selectCartItemsMap = createSelector(
  [selectCartReducer],
  (cart) => cart.items,
)

export const selectCartItems = createSelector(
  [selectCartItemsMap],
  (items) => Object.values(items),
)

export const selectCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.open
)

export const selectCartItemCount = createSelector(
  [selectCartItemsMap],
  (items) => itemCount(items),
)

export const selectCartTotal = createSelector(
  [selectCartItemsMap],
  (items) => total(items),
)