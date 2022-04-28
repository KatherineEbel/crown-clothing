import {createContext, useEffect, useState} from "react";

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
  removeItem(productId) {},
  toggleOpen: () => {},
})

export const CartProvider = ({children}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState({});
  const [itemCount, setItemCount] = useState(0)

  const incrementQuantity = (productId) => {
    const item = items[productId]
    const {quantity} = item;
    setItems({...items, [productId]: {...item, quantity: quantity + 1}})
  }

  const decrementQuantity = (productId) => {
    const item = items[productId]
    const {quantity} = item;
    if (quantity === 1) {
      const state = {...items}
      delete state[productId];
      return setItems(state);
    }
    setItems({...items, [productId]: {...item, quantity: quantity - 1}})
  }

  const removeItem = (productId) => {
    const state = {...items }
    delete state[productId];
    setItems(state);
  }

  const toggleOpen = () => {
    setOpen(!open);
  }

  const addToCart = (product) => {
    const {id} = product
    let quantity = items[product.id]?.quantity || 0;
    setItems({...items, [id]: {product, quantity: quantity + 1}})
  }

  useEffect(() => {
    const total = Object.values(items).reduce((total, {quantity}) => total + quantity, 0)
    setItemCount(total)
  }, [items])

  return (
    <CartContext.Provider value={{
      addToCart,
      itemCount,
      items: Object.values(items),
      open,
      toggleOpen,
      decrementQuantity,
      incrementQuantity,
      removeItem,
    }}>
      {children}
    </CartContext.Provider>
  )
}