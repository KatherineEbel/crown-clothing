import {Outlet} from "react-router-dom";
import {useContext} from "react";
import {Navigation as NavContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles'
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import {UserContext} from "../../contexts/user.context";
import {signOutAuthUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

export default function Navigation() {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const onLogOut = async () => {
    try {
      await signOutAuthUser();
      setCurrentUser(null);
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

