import { Link, Outlet } from "react-router-dom";
import {Fragment} from "react";
import './navigation.styles.scss'
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'

export default function Navigation() {
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrownLogo className='logo' />
        </Link>
        <div className="nav-links-container">
          <Link className='nav-link' to='/shop'>Shop</Link>
          <Link className='nav-link' to='/sign-in'>Sign in</Link>
        </div>
      </div>
      <Outlet/>
    </Fragment>
  )
}

