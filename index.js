const path = require('path');
const express = require("express");
require('dotenv').config();
const router = require('./routes');
const app = express();
app.use(express.json());
const dbo = require('./models/connection');

//Para liberar carpeta, para acceder a sus archivos
app.use('/public', express.static('public'));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use('/', router());

dbo.connectToServer((error) =>{
    if(error){
        console.error(error);

        process.exit();
    }
})

app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT}`);
});