import { Link, Outlet } from "react-router-dom";
import {Fragment, useContext} from "react";
import './navigation.styles.scss'
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import {UserContext} from "../../contexts/user.context";
import {signOutAuthUser} from "../../utils/firebase/firebase.utils";

export default function Navigation() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const onLogOut = async () => {
    try {
      await signOutAuthUser();
      setCurrentUser(null);
    } catch (e) {
      console.log(e.code)
    }
  }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrownLogo className='logo' />
        </Link>
        <div className="nav-links-container">
          <Link className='nav-link' to='/shop'>Shop</Link>
          {currentUser ? (
            <Link className='nav-link' to='/auth'
                  onClick={onLogOut}
            >Sign out</Link>
          ) : (

            <Link className='nav-link' to='/auth'>Sign in</Link>
          )}
        </div>
      </div>
      <Outlet/>
    </Fragment>
  )
}

