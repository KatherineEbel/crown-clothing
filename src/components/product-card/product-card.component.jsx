import './product-card.styles.scss';
import Button from "../button/button.component";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItemsMap} from "../../store/cart/cart.selector";
import {addToCart} from "../../store/cart/cart.action";

export default function ProductCard({product}) {
  const {name, imageUrl, price} = product
  const items = useSelector(selectCartItemsMap);
  const dispatch = useDispatch()

  const onSelectProduct = () => {
    dispatch(addToCart(items, product))
  }

  return (
    <div className='product-card'>
      <img src={imageUrl} alt=""/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button className='inverted'
              onClick={onSelectProduct}
      >Add to cart</Button>
    </div>
  );
}