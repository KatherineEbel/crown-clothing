import './cart-item.styles.scss';

export default function CartItem ({ cartItem: { name, imageUrl, price, quantity }}) {
  return (
    <div className='cart-item'>
      <img src={imageUrl} alt={name}/>
      <div className="item-details">
        <h3 className='name'>{name}</h3>
        <span>{quantity} X ${price}</span>
      </div>
    </div>
  )
}