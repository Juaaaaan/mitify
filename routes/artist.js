'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
//El express.router, nos permite hacer todas la funciones get, post, put... 
var api = express.Router();
//Cargamos el middleware de autentificación
var md_auth = require('../middlewares/autenticated');

api.get('/artist:id', md_auth.ensureAuth, ArtistController.getArtist);
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
//le pongo la interrogación porque puede que venga o puede que no venga
api.get('/artist/:page?', md_auth.ensureAuth, ArtistController.getArtists);

//Y exportamos los metodos del api
module.exports = api;