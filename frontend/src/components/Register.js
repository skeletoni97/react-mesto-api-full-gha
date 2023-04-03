import React from "react";
import { useState } from "react";
import { apiAuth } from "../utils/ApiAuth";
import { Link } from "react-router-dom";
function Register(props) {
  const [email, setIsEmail] = useState("");
  const [password, setIsPassword] = useState("");

  function handleSetEmail(e) {
    setIsEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setIsPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegistr(email, password);
  }

  return (
    <section className="register">
      <h2 className="register__text">Регистрация</h2>
      <form className="form-register" onSubmit={handleSubmit}>
        <input
          value={email || ""}
          onChange={handleSetEmail}
          type="email"
          placeholder="Email"
          className="form-register__input"
        />
        <input
          value={password || ""}
          onChange={handleSetPassword}
          type="Password"
          placeholder="Пароль"
          className=" form-register__input"
        />
        <button type="submit" className="form__button form-register__button">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="register__link ">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;
