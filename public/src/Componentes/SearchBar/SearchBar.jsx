import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    performSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  const performSearch = () => {
    const formattedSearchTerm =
      searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
    navigate(`/product/${formattedSearchTerm}`);
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </>
  );
};

export default SearchBar;
