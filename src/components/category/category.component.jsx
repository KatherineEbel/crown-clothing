import { useParams } from "react-router-dom";
import './category.scss';
import {useContext, useEffect, useState} from "react";
import {CategoriesContext} from "../../contexts/categoriesContext";
import ProductCard from "../product-card/product-card.component";

export default function Category () {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap])

  return (
    <div className='category'>
      {
        products?.map(product => <ProductCard key={product.id} product={product}/>)
      }
    </div>
  )
}