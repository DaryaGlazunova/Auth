import React from "react";

import "./_style.scss";
import { Link } from "react-router-dom";
import AuthService from '../../_services/auth.service'

const Header = (props) => {
 const {user, setUser} = {...props}

const logOut = () => {
    AuthService.removeUserTokenFromLocalStorage();
    setUser(AuthService.checkAutoLogin());
};

  return (
    <header className="header">
      <div className="header__container">
      <div className="header__auth-links">  
      {user.useremail ? (
        <Link onClick={() => logOut()} to="/login" >Выход</Link>
        
        ) : (
            <>
            <Link to="/login">Войти</Link>
            <Link to="/signup">Регистрация</Link>
            </>
        )}
      </div>
      </div>
    </header>
  );
};

export default Header;
