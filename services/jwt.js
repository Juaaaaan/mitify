'use strict'

var jwt = require('jwt-simple');
//Cargaremos la libreria "moment" para hacer dentro del payloards,
    //Payloads es el objeto que va codificar el jwt y lo va a guardar dentro de un token
    //Tendremos la fecha de ese token o payloards y la fecha de expiración y no funcionará la autenticacion
var moment = require('moment');
var secret = 'clave_secreta_curso';

exports.createToken = function(user){
//A esta función le pasamos un objeto de usuario que va a ser quien codifique dentro del token
    var payload = {
        //propiedades: 
            //sub: se usa para guardar el registo o id del objeto del usuario dentro de la base de datos
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        //Ahora la fecha de creación del token:
            //Unix() -> fecha en formato unix que nos saca la fecha en tiempo de timestamp actual
        iat: moment().unix(), 
        //Exp de expiration, de la fecha que va a expirar
            //En este caso, va a expirar cada 30 dias
        exp: moment().add(30, 'days').unix()
    };
//Le pasamos secret que es una clave secreta para hacer el hash
    return jwt.encode(payload, secret);
};