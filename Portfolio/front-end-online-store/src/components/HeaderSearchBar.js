import React, { useState } from 'react';
import '../css/Header.css';
import searchIcon from '../icons/searchIcon.png';

function HeaderSearchBar({ setQuery, setCategoryId, setProductDetailId }) {
  const [searchText, setSearchText] = useState('');

  function setParamsAPI() {
    setProductDetailId('');
    setQuery(searchText);
    setCategoryId('');
  }

  return (
    <div className="header-search-bar-container">
      <input
        type="text"
        className="header-search-bar-input"
        placeholder="O que você está procurando?"
        onChange={ (e) => setSearchText(e.target.value) }
      />
      <input
        type="image"
        src={ searchIcon }
        className="header-search-icon"
        onClick={ () => setParamsAPI() }
      />
    </div>
  );
}

export default HeaderSearchBar;
