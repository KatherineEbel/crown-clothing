import { Routes, Route } from "react-router-dom";
import './components/directory-item/directory-item.scss'
import './categories.styles.scss'
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Auth from "./routes/auth/auth.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {useEffect} from "react";
import {getUserDocFromAuth, listenForAuthChange} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    return listenForAuthChange(async (user) => {
      dispatch(setCurrentUser(user ? await getUserDocFromAuth(user) : null))
    });
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
