import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Explore.css';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />

      <div className="explore-container">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            className="button-explore"
          >
            Explorar Comidas
          </button>
        </Link>
        <br />
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            className="button-explore"
          >
            Explorar Bebidas
          </button>
        </Link>

        <Footer />
      </div>

    </div>
  );
}

export default Explore;
