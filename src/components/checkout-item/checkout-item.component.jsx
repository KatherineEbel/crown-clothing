import './checkout-item.styles.scss'
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

export default function CheckoutItem({product, quantity}) {
  const {decrementQuantity, incrementQuantity, removeItem} = useContext(CartContext);
  const {id, name, imageUrl, price} = product;

  const onClickDecrement = () => decrementQuantity(id)
  const onClickIncrement = () => incrementQuantity(id)
  const onRemoveItem = () => removeItem(id)

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