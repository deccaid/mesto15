import React from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email,
      password,
    });
  }
  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>

      <form className="input__form" onSubmit={handleSubmit}>
        <input
          className="login__input "
          id="email"
          value={email}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleEmail}
          required
        ></input>
        <input
          className="login__input "
          id="password"
          value={password}
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handlePassword}
          required
        ></input>
        <button className="login__button">Войти</button>
      </form>
    </div>
  );
};

export default Login;
