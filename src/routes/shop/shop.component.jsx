import { Routes, Route } from "react-router-dom";
import './shop.styles.scss'
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../../components/category/category.component";
import {useDispatch } from "react-redux";
import {useEffect} from "react";
import {fetchCategoriesStart} from "../../store/categories/category.action";

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart())
  }, [dispatch])
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=':category' element={ <Category/>} />
    </Routes>
  )
}