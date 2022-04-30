import {CART_ACTION_TYPES} from "./cart.types";
import {createAction} from "../../utils/reducer/reducer.utils";

export const setCartOpen = boolean => createAction(CART_ACTION_TYPES.SET_OPEN, boolean)

export const incrementQuantity = (itemsMap, productId) => {
  const item = itemsMap[productId]
  const {quantity} = item;
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    ...itemsMap,
    [productId]: {...item, quantity: quantity + 1}
  })
}

export const decrementQuantity = (itemsMap, productId) => {
  const item = itemsMap[productId]
  let updatedItems;
  const {quantity} = item;
  if (quantity === 1) {
    updatedItems = {...itemsMap}
    delete updatedItems[productId];
  }
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    updatedItems ? updatedItems : (
      {...itemsMap, [productId]: {...item, quantity: quantity - 1}}
    ))
}

export const removeItem = (itemsMap, productId) => {
  const state = {...itemsMap}
  delete state[productId];
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, state);
}

export const addToCart = (itemsMap, product) => {
  const {id} = product
  let quantity = itemsMap[product.id]?.quantity || 0;
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {...itemsMap, [id]: {...product, quantity: quantity + 1}})
}
