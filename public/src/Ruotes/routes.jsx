import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import { useProducts } from '../usecontext/ContextCard.jsx';
import Cards from '../componetes/Cards.jsx'

function Rutas (){
    const {pokemon, items} = useProducts();

    return (
        <Router>
            <Routes>
                <Route path="/pokemon" element={<Cards products={pokemon} />} />
                <Route path="/items" element={<Cards products={items} />} />
            </Routes>
        </Router>
    );
}

export default Rutas;
