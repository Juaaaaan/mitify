'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
//El express.router, nos permite hacer todas la funciones get, post, put... 
var api = express.Router();
//Cargamos el middleware de autentificación
var md_auth = require('../middlewares/autenticated');

//El Artista tendrá su imagen/avatar. Esto lo hacemos con Multiparty
    //Esto lo que nos hace es poder enviar ficheros a través del protocolo http

    var multipart = require('connect-multiparty');
    //Crearemos un middleware.
        //Dentro del multipart, tenemos que poner la ruta donde se van a subir los ficheros. 
    var md_upload = multipart({ uploadDir: './uploads/artists' });
    

api.get('/artist:id', md_auth.ensureAuth, ArtistController.getArtist);
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
//le pongo la interrogación porque puede que venga o puede que no venga
api.get('/artist/:page?', md_auth.ensureAuth, ArtistController.getArtists);
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);
api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile);

//Y exportamos los metodos del api
module.exports = api;