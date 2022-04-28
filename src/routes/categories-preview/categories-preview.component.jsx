import {useContext} from "react";
import {CategoriesContext} from "../../contexts/categoriesContext";
import './categories-preview.styles.scss'
import CategoryPreview from "../../components/category-preview/category-preview.component";

export default function CategoriesPreview() {
  const {categoriesMap} = useContext(CategoriesContext)
  return (
    <>
      {
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products}/>
        })
      }
    </>
  )
}
