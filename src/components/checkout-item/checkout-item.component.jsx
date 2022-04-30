import './checkout-item.styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {decrementQuantity, incrementQuantity, removeItem} from "../../store/cart/cart.action";
import {selectCartItemsMap} from "../../store/cart/cart.selector";

export default function CheckoutItem({product}) {
  const items = useSelector(selectCartItemsMap);
  const {id, name, imageUrl, price, quantity} = product;
  const dispatch = useDispatch()

  const onClickDecrement = () => dispatch(decrementQuantity(items, id))
  const onClickIncrement = () => dispatch(incrementQuantity(items, id))
  const onRemoveItem = () => dispatch(removeItem(items, id))

  return (
    <tr className='checkout-item'>
      <td className='image-container'>
        <img src={imageUrl} alt={name}/>
      </td>
      <td className='name'>
        {name}
      </td>
      <td className='quantity'>
        <span className='arrow'
                onClick={onClickDecrement}
        >&#10094;</span>
        <span className='value'>
        {quantity}
        </span>
        <span className='arrow'
                onClick={onClickIncrement}
        >&#10095;</span>
      </td>
      <td className='price'>{price}</td>
      <td>
        <span className='remove-button'
                onClick={onRemoveItem}>
          &#10005;
        </span>
      </td>
    </tr>
  )
}