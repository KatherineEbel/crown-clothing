import './product-card.styles.scss';
import Button from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

export default function ProductCard({ product}) {
  const { name, imageUrl, price }  = product
  const { addToCart } = useContext(CartContext)
  return (
    <div className='product-card'>
      <img src={imageUrl} alt=""/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button className='inverted'
              onClick={addToCart.bind(null, product)}
      >Add to cart</Button>
    </div>
  );
}