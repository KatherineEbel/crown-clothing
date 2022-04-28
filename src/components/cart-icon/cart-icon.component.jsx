import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartIcon as Icon, ItemCount, ShoppingIcon} from "./cart-icon.styles";

export default function CartIcon () {
  const {itemCount, toggleOpen } = useContext(CartContext)
  return (
    <Icon onClick={toggleOpen}>
      <ShoppingIcon/>
      <ItemCount>{itemCount}</ItemCount>
    </Icon>
  )
}