import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rutas from './Ruotes/routes.jsx'

import { ProductProvider } from './usecontext/ContextCard.jsx';

function App() {

  return (
    <>
      <ProductProvider>
        <Rutas/>
      </ProductProvider>
    </>
  );
}

export default App;
