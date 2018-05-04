'use strict'

var express = require('express');
//Cuando hacemos una acción por post, bodyParser automaticamente te lo convierte a JSON
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');

//Configurar bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //Convertir los datos http a JSON

//configurar las cabeceras http

//carga de rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);

module.exports = app;
