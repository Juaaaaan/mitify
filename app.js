'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');

//Configurar bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //Convertir los datos http a JSON

//configurar las cabeceras http

//carga de rutas base
app.use('/api', user_routes);

module.exports = app;
