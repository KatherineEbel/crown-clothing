import {useContext} from "react";
import {ProductsContext} from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss'

export default function Shop () {
  const { products } = useContext(ProductsContext)
  return (
    <div className='shop'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}