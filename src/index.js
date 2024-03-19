const express =require('express');
const app = express();
//const dbConnection = require( './db/connection') ; 
const PORT = process.env.PORT || 5000



app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})

