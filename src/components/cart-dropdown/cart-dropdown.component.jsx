import Button from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import './cart-dropdown.styles.scss'
import {useNavigate } from "react-router-dom";

export default function CartDropdown() {
  const { open, toggleOpen, items } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCart = () => {
    toggleOpen();
    navigate('/checkout');
  }

  return (
    <div className={`cart-dropdown ${open ? 'open' : ''}`}>
      <div className="cart-items">
        {items.map(item => (<CartItem key={item.id} cartItem={item}/>))}
      </div>
      <Button onClick={goToCart}>Go to checkout</Button>
    </div>
  )
}