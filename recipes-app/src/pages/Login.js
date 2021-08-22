import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';
import '../css/Login.css';

function Login() {
  const { handleChange, handleDisabled, email } = useContext(RecipeAppContext);

  const submitCredentials = () => {
    const emailStringfied = JSON.stringify({ email });
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', emailStringfied);
  };

  return (
    <div className="login">
      <p className="login-title">Login</p>
      <label htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          data-testid="email-input"
          onChange={ (e) => handleChange(e) }
          className="input-login"
        />
      </label>
      {' '}
      <br />
      <label htmlFor="password">
        Password
        <input
          id="password"
          name="password"
          type="password"
          data-testid="password-input"
          onChange={ (e) => handleChange(e) }
          className="input-login"
        />
      </label>
      {' '}
      <br />
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ () => submitCredentials() }
          disabled={ handleDisabled() }
          className="button-login"
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default Login;
