import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({
  items: [],
  itemCount: 0,
  open: false,
  toggleOpen: () => {},
})

export const CartProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [items ] = useState([]);
  const [itemCount, setItemCount] = useState(0)

  const toggleOpen = () => {
    setOpen(!open);
  }

  useEffect(() => {
    setItemCount(items.length)
  }, [items])

  return (
    <CartContext.Provider value={{itemCount, items, open, toggleOpen}}>
      { children }
    </CartContext.Provider>
  )
}