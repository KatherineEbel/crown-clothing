import {createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
  addToCart: (_) => {
  },
  decrementQuantity: (_) => {
  },
  incrementQuantity: (_) => {
  },
  items: [],
  itemCount: 0,
  open: false,
  removeItem(productId) {
  },
  toggleOpen: () => {
  },
})

const CART_ACTION_TYPES = {
  TOGGLE_OPEN: 'TOGGLE_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
}


const cartReducer = (state, action) => {
  const { open } = state;
  const {type, payload} = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPES.TOGGLE_OPEN:
      return {...state, open: !open}
    default:
      throw new Error(`Unhandled type ${type} for cart reducer`)

  }
}

const INITIAL_STATE = {
  itemCount: 0,
  items: {},
  open: false,
  total: 0,
}

export const CartProvider = ({children}) => {
  const [{items, open, itemCount, total}, dispatch] = useReducer(cartReducer, INITIAL_STATE)


  const updateCartItems = (items) => {
    const type = CART_ACTION_TYPES.SET_CART_ITEMS;
    const {total, itemCount} = Object.values(items).reduce((acc, item) => {
      const {price, quantity} = item
      acc.total += price * quantity;
      acc.itemCount += quantity;
      return acc
    }, {total: 0, itemCount: 0})

    dispatch(createAction(type, {items, itemCount, total}))
  }

  const incrementQuantity = (productId) => {
    const item = items[productId]
    const {quantity} = item;
    updateCartItems({...items, [productId]: {...item, quantity: quantity + 1}})
  }

  const decrementQuantity = (productId) => {
    const item = items[productId]
    const {quantity} = item;
    if (quantity === 1) {
      const state = {...items}
      delete state[productId];
      return updateCartItems(state)
    }
    updateCartItems({...items, [productId]: {...item, quantity: quantity - 1}})
  }

  const removeItem = (productId) => {
    const state = {...items}
    delete state[productId];
    updateCartItems(state);
  }

  const toggleOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_OPEN))
  }

  const addToCart = (product) => {
    const {id} = product
    let quantity = items[product.id]?.quantity || 0;
    updateCartItems({...items, [id]: {...product, quantity: quantity + 1}})
  }

  return (
    <CartContext.Provider value={{
      addToCart,
      itemCount,
      items: Object.values(items),
      open,
      total,
      toggleOpen,
      decrementQuantity,
      incrementQuantity,
      removeItem,
    }}>
      {children}
    </CartContext.Provider>
  )
}