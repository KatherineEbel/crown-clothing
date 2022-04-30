import {CartIcon as Icon, ItemCount, ShoppingIcon} from "./cart-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItemCount, selectCartOpen} from "../../store/cart/cart.selector";
import {setCartOpen} from "../../store/cart/cart.action";

export default function CartIcon () {
  const open = useSelector(selectCartOpen);
  const itemCount = useSelector(selectCartItemCount);
  const dispatch = useDispatch()

  const onClickIcon = () => {
    dispatch(setCartOpen(!open))
  }

  return (
    <Icon onClick={onClickIcon}>
      <ShoppingIcon/>
      <ItemCount>{itemCount}</ItemCount>
    </Icon>
  )
}