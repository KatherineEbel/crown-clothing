import {Outlet} from "react-router-dom";
import {Navigation as NavContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles'
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import {signOutAuthUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../../store/user/user.action";
import {selectCurrentUser} from "../../store/user/user.selector";

export default function Navigation() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const onLogOut = async () => {
    try {
      await signOutAuthUser();
      dispatch(setCurrentUser(null));
    } catch (e) {
      console.log(e.code)
    }
  }

  return (
    <>
      <NavContainer>
        <LogoContainer className='logo-container' to='/'>
          <CrownLogo className='logo'/>
        </LogoContainer>
        <NavLinks className="nav-links-container">
          <NavLink className='nav-link' to='/shop'>Shop</NavLink>
          {currentUser ? (
            <NavLink as='span' className='nav-link' to='/auth'
                  onClick={onLogOut}
            >Sign out</NavLink>
          ) : (
            <NavLink className='nav-link' to='/auth'>Sign in</NavLink>
          )}
          <CartIcon/>
        </NavLinks>
        <CartDropdown/>
      </NavContainer>
      <Outlet/>
    </>
  )
}

