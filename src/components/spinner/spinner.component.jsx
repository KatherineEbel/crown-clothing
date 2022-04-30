import './spinner.styles'
import {SpinnerContainer, SpinnerOverlay} from "./spinner.styles";
import {useSelector} from "react-redux";
import {selectCategoriesLoading} from "../../store/categories/category.selector";

function Spinner() {
  const loading = useSelector(selectCategoriesLoading)
  if (!loading) return null;

  return (
    <SpinnerOverlay>
      <SpinnerContainer/>
    </SpinnerOverlay>
  )
}

export default Spinner;