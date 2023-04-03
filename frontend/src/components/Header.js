import { Link, Route, Routes } from "react-router-dom";
import React from "react";

function Header(props) {
  
  return (
    <header className="header">
      <div className="header__logo"></div>
      {props.loggedIn ? (
        <div className="header__nav">
          <p className="header__email">{props.email}</p>
          <Link
            className="header__button"
            to="/sign-in"
            onClick={props.handleSignOut}
          >
            Выйти
          </Link>
        </div>
      ) : (
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link
                className="header__button"
                to="/sign-in"
                onClick={props.handleSignOut}
              >
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link
                className="header__button"
                to="/sign-up"
                onClick={props.handleSignOut}
              >
                Регистрация
              </Link>
            }
          />
        </Routes>
      )}
    </header>
  );
}

export default Header;
