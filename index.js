require('dotenv').config();
//conexion con DB
require('./src/utils/mongoClient.js');
//Inicializador del api y exporta todo lo necesario para iniciar el server
const {PORT, app} = require('./src/api/index.js');

app.listen(PORT, ()=>{
    console.log(`Server initializzed on PORT: ${PORT}`)
});