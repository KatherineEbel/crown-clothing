import './cart-dropdown.styles.scss'
import Button from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

export default function CartDropdown() {
  const { open } = useContext(CartContext)
  return (
    <div className={`cart-dropdown ${open ? 'open' : ''}`}>
      <div className="cart-items"></div>
      <Button>Go to checkout</Button>
    </div>
  )
}