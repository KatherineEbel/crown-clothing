import { Routes, Route } from "react-router-dom";
import './components/directory-item/directory-item.scss'
import './categories.styles.scss'
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Auth from "./routes/auth/auth.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {useEffect} from "react";
import {checkUserSession } from "./store/user/user.action";
import {useDispatch} from "react-redux";
import {setCartOpen} from "./store/cart/cart.action";


function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    const closeCartListener = (event) => {
      if (event.target.closest('.cart-icon') !== null || event.target.closest('.cart-dropdown') !== null) return;
      dispatch(setCartOpen(false));
    }
    dispatch(checkUserSession());
    document.addEventListener('click', closeCartListener)
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='auth' element={<Auth/>}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>
  );
}

export default App;
