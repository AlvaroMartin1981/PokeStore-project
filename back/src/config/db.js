const mongoose = require('mongoose');
require('dotenv').config();
//const ObtenerPokemons =require('../utils/axiosPoke')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: {
              w: 'majority',
              j: true,
              timeout: 1000
            }
          })
          //ObtenerPokemons()
        console.log('Base de datos conectada con éxito');
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};
module.exports = dbConnection;
