import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import './cart-icon.styles.scss'
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

export default function CartIcon () {
  const {itemCount, toggleOpen } = useContext(CartContext)
  return (
    <div className='cart-icon' onClick={toggleOpen}>
      <ShoppingIcon className='shopping-icon'/>
      <span>{itemCount}</span>
    </div>
  )
}