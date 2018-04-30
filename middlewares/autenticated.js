'use strict'

var jwt = require('jwt-simple');
//Cargaremos la libreria "moment" para hacer dentro del payloards,
    //Payloads es el objeto que va codificar el jwt y lo va a guardar dentro de un token
    //Tendremos la fecha de ese token o payloards y la fecha de expiración y no funcionará la autenticacion
var moment = require('moment');
var secret = 'clave_secreta_curso';

//Comprobar si los datos son correcto, del token que se va a generar
exports.ensureAuth = function(req, res, next){
//Como este middleware se va a ejecutar antes de que llegue a la acción del controlador 
//Va a recibir todos los parametros que una acción http
    if(!req.headers.authorization){
        return res.status(404).send({message: 'la petición no tiene la cabecera de autenticación'});
    }
    //Es posible que el token venga con "cpmillas" por delante y por detrás
    var token = req.headers.authorization.replace(/['"]+/g,'');
    //Ahora hay que decodificar el token de jtw. 
    try{
        //Payload es el objeto que esta guardado dentro del token
        var payload = jwt.decode(token, secret);

        if(payload.ex <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
    }catch (ex){
        console.log(ex);
        return res.status(404).send({message: 'Token no valido'});
    }
    //Añadir propiedad al objeto request, es decir, que vamos a tener disponible dentro de cada metodo que utilice este middleware
    //vamos a tener un objeto user con todos los datos identificados, con todos los datos del usuario que nos viene en el token. 
    req.user = payload; //Ya tenemos disponibles los datos

    //Para salir de este middleware, usamos next()
    next();
};