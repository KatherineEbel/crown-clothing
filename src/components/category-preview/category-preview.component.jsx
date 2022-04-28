import './category-preview.styles.scss';
import ProductCard from "../product-card/product-card.component";
import {Link} from "react-router-dom";

export default function CategoryPreview ({ title, products }) {
  return (
    <div className='category-preview'>
      <h2>
        <Link to={`/shop/${title}`}>
          <span className='title'>{title.toUpperCase()}</span>
        </Link>
      </h2>
      <div className='preview'>
        {
          products.slice(0, 4).map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))
        }
      </div>
    </div>
  )
}