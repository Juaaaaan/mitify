'use strict'
//fs es el modulo filesystem
var fs = require('fs');
//Path para acceder a rutas concretas
var path = require('path');

//Utilizamos los siguientes modelos
var Artist = require('../models/artist');
var Album = require('../models/album');
//var Song = require('../models/song');

function getArtist(req, res){
    res.status(200).send({message:'Método getArtist del controlador artist.js'});
}

//para poder utilizar los metodos que utilizar en nuestro controlador:
module.exports = {
    getArtist
}

