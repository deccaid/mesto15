import React from "react";
import logo from "../images/logo1.svg";
import { Link, Route, Routes } from "react-router-dom";
export default function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Место" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__auth" to="/sign-up">
              Регистрация
            </Link>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <Link className="header__auth" to="/sign-in">
              Войти
            </Link>
          }
        ></Route>
        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__email">{props.email}</p>
              <Link
                to="sign-in"
                className="header__link"
                onClick={props.onLogout}
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
