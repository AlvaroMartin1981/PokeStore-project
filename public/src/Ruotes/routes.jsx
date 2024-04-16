import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useProducts } from '../usecontext/ContextCard.jsx';
import Cards from '../componetes/Cards.jsx';

function Rutas (){
    const {pokemons,items,pokeballs} = useProducts();

    return (
        <Router>
            <Routes>
                <Route path="/pokemon" element={<Cards products={pokemons} />} />
                <Route path="/items" element={<Cards products={items} />} />
                <Route path="/pokeballs" element={<Cards products={pokeballs} />} />
            </Routes>
        </Router>
    );
}

export default Rutas;
