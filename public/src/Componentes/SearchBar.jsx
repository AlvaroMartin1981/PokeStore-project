import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Convertir la primera letra del término de búsqueda en mayúscula
    const formattedSearchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
    // Redirige a la ruta de búsqueda con el término de búsqueda formateado como parámetro
    navigate(`/product/${formattedSearchTerm}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
