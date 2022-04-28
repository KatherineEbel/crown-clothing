import { Routes, Route } from "react-router-dom";
import './shop.styles.scss'
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../../components/category/category.component";

export default function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=':category' element={ <Category/>} />
    </Routes>
  )
}