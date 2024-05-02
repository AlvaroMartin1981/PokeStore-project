import './App.css'
import Rutas from './Ruotes/Routes.jsx'
import { ProductProvider } from './usecontext/ProductContext.jsx';
import { CarritoProvider } from './usecontext/CarritoContext.jsx';
import { UserProvider } from './usecontext/UserContext.jsx';

function App() {

  return (
    <>
         <UserProvider>
        <ProductProvider>
          <CarritoProvider>
            <Rutas/>
          </CarritoProvider>
        </ProductProvider>
      </UserProvider>  
    </>
  );
}

export default App;