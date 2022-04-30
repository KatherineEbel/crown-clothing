import { Routes, Route } from "react-router-dom";
import './shop.styles.scss'
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../../components/category/category.component";
import {useDispatch } from "react-redux";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {setCategories} from "../../store/categories/category.action";

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const categories = await getCategoriesAndDocuments();
      dispatch(setCategories(categories))
    })()
  }, [dispatch])
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=':category' element={ <Category/>} />
    </Routes>
  )
}