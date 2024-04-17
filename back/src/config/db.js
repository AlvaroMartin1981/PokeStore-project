const mongoose = require('mongoose');
require('dotenv').config();

const obtenerItems =require('../utils/axiosItems')
const ObtenerPokemons =require('../utils/axiosPoke')
let url='https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Base de datos conectada con exito');
        
      
        
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};

module.exports = dbConnection   