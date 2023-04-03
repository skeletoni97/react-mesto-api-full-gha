import React from "react";

import { useState } from "react";
function Login(props) {
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
    props.onSignin(email, password);
  }

  return (
    <section className="register">
      <h2 className="register__text">Вход</h2>
      <form className="form form-register" onSubmit={handleSubmit}>
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
          Вход
        </button>
      </form>
    </section>
  );
}

export default Login;
