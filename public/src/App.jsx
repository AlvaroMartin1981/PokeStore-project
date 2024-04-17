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

/*Set(36) {
  'standard-balls',
  'special-balls',
  'healing',
  'status-cures',
  'revival',
  'pp-recovery',
  'vitamins',
  'stat-boosts',
  'spelunking',
  'flutes',
  'collectibles',
  'evolution',
  'loot',
  'dex-completion',
  'mulch',
  'species-specific',
  'all-mail',
  'medicine',
  'picky-healing',
  'baking-only',
  'effort-drop',
  'type-protection',
  'in-a-pinch',
  'other',
  'held-items',
  'effort-training',
  'training',
  'choice',
  'type-enhancement',
  'scarves',
  'bad-held-items',
  'plates',
  'all-machines',
  'gameplay',
  'unused',
  'plot-advancement'
}*/