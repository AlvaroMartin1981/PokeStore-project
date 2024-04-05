const ItemModel = require ('../models/ItemModel');
const PokemonModel = require ('../models/PokemonModel');
const PokeBallModel = require ('../models/PokeBallModel')


const getNavBar = (path) => {
    let html = '';
    if(path === '/dashboard' || path === '/dashboard/') {
        html = `<!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/styles.css">
                <title>PokeStore</title>
            </head>
            <body>
                <nav class="navbar">
                    <ul>
                        <li><a href="/dashboard/">Productos</a></li>
                        <li><a href="/dashboard/pokemon">Pokemon</a></li>
                        <li><a href="/dashboard/item">Items</a></li>
                        <li><a href="/dashboard/pokeball">Pokeball</a></li>
                        <li><a href="/dashboard/new">Nuevo Producto</a></li>
                        <li><a href="/logout">Logout</a>
                    </ul>
                </nav>
                <h2 class="title">Productos</h2>        
        `
    } else {
        html = `<!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/styles.css">
                <title>PokeStore</title>
            </head>
            <body>
                <nav class="navbar">
                    <ul>
                        <li><a href="/dashboard/">Productos</a></li>
                        <li><a href="/dashboard/pokemon">Pokemon</a></li>
                        <li><a href="/dashboard/item">Items</a></li>
                        <li><a href="/dashboard/pokeball">Pokeball</a></li>
                        <li><a href="/login">Login</a>
                    </ul>
                </nav>
                <h2 class="title">Productos</h2>        
        `
    }
    return html;
};


const getProducts = (path, products) => {
    let html = `<div><h1>Dashboard</h1>`;
    
    // Card para Item
    html += `<div class="card">
                 <img src="${products.items.length > 0 ? products.items[0].imagen : 'placeholder_image.jpg'}" alt="Item">
                 <h3>Item</h3>
                 <a href="/items" class="btn">Ver Items</a>
             </div>`;
    
    // Card para Pokeball
    html += `<div class="card">
                 <img src="${products.pokeballs.length > 0 ? products.pokeballs[0].imagen : 'placeholder_image.jpg'}" alt="Pokeball">
                 <h3>Pokeball</h3>
                 <a href="/pokeballs" class="btn">Ver Pokeballs</a>
             </div>`;
    
    // Card para Pokemon
    html += `<div class="card">
                 <img src="${products.pokemons.length > 0 ? products.pokemons[0].imagen : 'placeholder_image.jpg'}" alt="Pokemon">
                 <h3>Pokemon</h3>
                 <a href="/pokemons" class="btn">Ver Pokemons</a>
             </div>`;
    
    html += `</div>`;
    
    return html;
};







const showProducts = async (req, res) => {
    const path = req.path;
    try {
        const items = await ItemModel.find();
        const pokeball = await PokeBallModel.find();
        const pokemon = await PokemonModel.find();
        
        const products = { items, pokeball, pokemon };
        
        res.send(getNavBar(path) + getProducts(path, products));
    } catch (error) {
        console.log('error', error);
        return res.status(500).send({ message: 'There was a problem trying get all products' });
    }
}

module.exports  = {
    getNavBar,
    getProducts,
    showProducts
}