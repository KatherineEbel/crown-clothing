import './product-card.styles.scss';
import Button from "../button/button.component";

export default function ProductCard({ product: { name, imageUrl, price } }) {
  return (
    <div className='product-card'>
      <img src={imageUrl} alt=""/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button className='inverted'>Add to cart</Button>
    </div>
  );
}