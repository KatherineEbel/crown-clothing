import './categories-preview.styles.scss'
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {selectCategoriesLoading, selectCategoriesMap} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap)
  const loading = useSelector(selectCategoriesLoading);
  return (
    <>
      {loading ? (<Spinner/>) :
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products}/>
        })
      }
    </>
  )
}
