import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import './cart-dropdown.styles.scss'
import {useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems, selectCartOpen} from "../../store/cart/cart.selector";
import {setCartOpen} from "../../store/cart/cart.action";

export default function CartDropdown() {
  const dispatch = useDispatch()
  const open = useSelector(selectCartOpen);
  const items = useSelector(selectCartItems);
  const navigate = useNavigate()

  const goToCart = () => {
    dispatch(setCartOpen(false))
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