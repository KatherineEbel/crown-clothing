import { useParams } from "react-router-dom";
import './category.scss';
import { useEffect, useState} from "react";
import ProductCard from "../product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/category.selector";

export default function Category () {
  const categoriesMap = useSelector(selectCategoriesMap)
  const { category } = useParams();
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