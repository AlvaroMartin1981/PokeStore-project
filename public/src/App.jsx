import './App.css'
import Rutas from './Ruotes/routes.jsx'
import { ProductProvider } from './usecontext/ProductContext.jsx';
import { CarritoProvider } from './usecontext/CarritoContext.jsx';

function App() {

  return (
    <>
      <ProductProvider>
        <CarritoProvider>
          <Rutas/>
        </CarritoProvider>
      </ProductProvider>
    </>
  );
}

export default App;