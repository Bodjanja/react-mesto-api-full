import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'

function Header(props){
  return(
    <header className="header header_position_align">
        <Link to={'#'} target="_self">
          <img src={logo} className="logo" alt="Логотип" />
        </Link>
        {props.loggedIn ?
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <p style={{marginRight: '24px'}} className='profile__subtitle'>{props.userData.email}</p>
        <Link className='header__link' to={'/sign-in'} onClick={props.signOut} style={{color: '#A9A9A9'}}>Выйти</Link>
        </div>
        :
        <Link className='header__link' onClick={props.redirectHandler} to={props.loginPage ? '/sign-up' : '/sign-in'}>{props.loginPage ? 'Зарегистрироваться' : 'Войти'}</Link>}
    </header>
  )
  }

export default Header;