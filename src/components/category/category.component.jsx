import { useParams } from "react-router-dom";
import './category.scss';
import { useEffect, useState} from "react";
import ProductCard from "../product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesLoading, selectCategoriesMap} from "../../store/categories/category.selector";
import Spinner from "../spinner/spinner.component";

function Category () {
  const loading = useSelector(selectCategoriesLoading)
  const categoriesMap = useSelector(selectCategoriesMap)
  const { category } = useParams();
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap])

  return (
    <div className='category'>
      <h2>{category.toUpperCase()}</h2>
      {
        loading ? (<Spinner/>) : (
          <>
            {
              products?.map(product => <ProductCard key={product.id} product={product}/>)
            }
          </>
        )
      }
    </div>
  )
}

export default Category;