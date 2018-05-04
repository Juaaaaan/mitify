'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/autenticated');

//El usuario tendrá su imagen/avatar. Esto lo hacemos con Multiparty
    //Esto lo que nos hace es poder enviar ficheros a través del protocolo http

var multipart = require('connect-multiparty');
//Crearemos un middleware.
    //Dentro del multipart, tenemos que poner la ruta donde se van a subir los ficheros. 
var md_upload = multipart({ uploadDir: './uploads/users' });

api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
//Usamos el metodo .put para actualizar el usuario
    //En el caso de que no fuese obligatorio el id, le pondriamos una "?", es decir, 
    // api.put('/update-user/:id?')
    // + queremos que el usuario este autenticado para poder actualizar su información
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
//vamos a tener que usar el middleware.
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);



module.exports = api;