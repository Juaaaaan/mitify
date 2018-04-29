import { create } from 'domain';

'use strict'

var jwt = require('jwt-simple');
//Cargaremos la libreria "moment" para hacer dentro del payloards,
    //Payloards es el objeto que va codificar el jwt y lo va a guardar dentro de un token
    //Tendremos la fecha de ese token o payloards y la fecha de expiración y no funcionará la autenticacion
var moment = require('moment');

exports.createToken = function(user){
//A esta función le pasamos un objeto de usuario que va a ser quien codifique dentro del token




}
