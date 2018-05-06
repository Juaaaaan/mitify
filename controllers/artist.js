'use strict'

//Path para acceder a rutas concretas
var path = require('path');
//fs es el modulo filesystem
var fs = require('fs');


//Utilizamos los siguientes modelos
var Artist = require('../models/artist');
//var Album = require('../models/album');
//var Song = require('../models/song');

//Get artist. Sacar artista de nuestra base de datos
function getArtist(req, res){
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if (err){
            res.status(500).send({message: 'Error en la petición.'});
        }else{
            if(!artist){
                res.status(404).send({message: 'El artista no existe'});
            }else{
                res.status(200).send({artist});
            }
        }
    });
}

//Guardar artista
function saveArtist(req, res){
    var artist = new Artist();

    var params = req.body();
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) =>{
        if(err){
            res.status(500).send({message: 'Error al guardar el artista'});
        }else{
            if(!artistStored){
                res.status(404).send({message: 'El artista no ha sido guardado'});
            }else{
                res.status(200).send({artist: artistStored});
            }
        }
    });
}


//para poder utilizar los metodos que utilizar en nuestro controlador:
module.exports = {
    getArtist,
    saveArtist
};

