'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando una acción del controlador de usuarios del api rest con Node y Mongo'
    });
}

function saveUser(req, res){
    var user = new User();

    var params = req.body;

    console.log(params); //para ver que nos llega por la petición
//Variables que nos vienen por post
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER'; //Usuario normal
    user.image = 'null';

    //Guardar los datos en la base de datos con el metodo save de Mongoose
    //Encriptamos la contraseña
    if(params.password){
        // Encriptar contraseña
        bcrypt.hash(params.password, null, null, function(err, hash){
            //Si no ha tenido ningun error de hash = lo ha "hasheado" correctamente
            //Le asignamos el valor hash a la contraseña del usuario
            user.password = hash;
            //Comprobar si el name y surname tienen información
            if(user.name != null && user.surname != null && user.email != null){
                //Guardar el usuario
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message:'Error al guardar el usuario'});
                    }else{
                        if(!user.userStored){
                            res.status(404).send({message:'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            }else{
                //No guardar usuario y mensaje: 
                res.status(200).send({message:'Rellene todos los campos'});
            }
        });
    }else{
        //ERROR = 200 -> todo ha ido correctamente
        //ERROR = 500 -> hay un error en el servidor, no se conecta a la base de datos
        //ERROR = 400 -> falta un recurso
        //Que nos devuelva un error 200
        //RES = response
        res.status(200).send({message:'Introduzca la contraseña'});
    }
};

//Para que funcione, hay que exportarlo. 
module.exports = {
    pruebas,
    saveUser
};