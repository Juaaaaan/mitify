'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas

//Configurar bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //Convertir los datos http a JSON

//configurar las cabeceras http

//carga de rutas base
app.get('/pruebas', function(req, res){
    res.status(200).send({message: 'Bienvenido al Mitify'})
});
module.exports = app;
