import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Profile.css';

function Perfil() {
  const user = localStorage.getItem('user');
  const objUser = JSON.parse(user) || {};

  return (
    <div>
      <Header title="Perfil" />
      <div className="email-profile">
        <p>Email: </p>
        <p data-testid="profile-email">{objUser.email}</p>
      </div>
      <div className="profile-container">
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="profile-button"
          >
            Receitas Feitas
          </button>
        </Link>

        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="profile-button"
          >
            Receitas Favoritas
          </button>
        </Link>

        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            className="profile-button"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
