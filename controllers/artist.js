'use strict'

//Path para acceder a rutas concretas
var path = require('path');
//fs es el modulo filesystem
var fs = require('fs');
//Importar el módulo de paginación
var mongoosePaginate = require('mongoose-pagination');

//Utilizamos los siguientes modelos
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

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

//Vamos a utilizar paginación
function getArtists(req, res){
    //Comprobamos que venga el artista
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, function(err, artists, total){
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }else{
            if(!artist){
                res.status(404).send({message: 'No hay artistas'});
            }else{
                return res.status(200).send({
                    total_items: total, 
                    artists: artist
                });
            }
        }
    });
}

//Actualizar artista
function updateArtist(req, res){
    var artistId = req.params.id;
    //Nos llegan los datos por Post, en el body de la petición por put
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el artista'});
        }else{
            if(!artistUpdated){
                res.status(404).send({message: 'El artista no ha sido actualizado'});
            }else{
                res.status(500).send({artist: artistUpdated});
            }
        }
    });
}

//Eliminar un artista
    //Este metodo lo que lleva es, borrar al artista junto con todos sus album y borrar las canciones que tenga el album asociado

function deleteArtist(req, res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar el artista'});
        }else{
            if(!artistRemoved){
                res.status(404).send({message: 'El artista no ha sido eliminado'});
            }else{
                //console.log(artistRemoved);
                //Vamos a borrar todo lo que tenga asociado a él: 
                    //Un where que saque todos los album cuyo artista sea eliminado por Id. Despues con el .remove, lo eliminamos
                Album.find({artist:artistRemoved._id}).remove((err, albumRemoved)=> {
                    if(err){
                        res.status(500).send({message: 'Error al eliminar el álbum'});   
                    }else{
                        if(!albumRemoved){
                            res.status(404).send({message: 'El álbum no ha sido eliminado'});
                        }else{
                            //Repetimos los mismos pasos, para la canción
                            Song.find({artist:artistRemoved._id}).remove((err, songRemoved)=> {
                                if(err){
                                    res.status(500).send({message: 'Error al eliminar la canción'});   
                                }else{
                                    if(!songRemoved){
                                        res.status(404).send({message: 'La canción no ha sido eliminada'});
                                    }else{
                                        res.status(200).send({artist: artistRemoved});
                                    }
                                }
                            });
                        }
                    }
                });
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

//Imagenes del artista

function uploadImage(req, res){
    var artistId = req.params.id;
    var file_name = 'No subido...';

    //Con el connect-multiparty podemos utilizar las variables superglobales files.
        //Comprobaremos si viene algo por files
        if(req.files){
            //En caso de que el usuario haya subido una imagen
            var file_name = req.file.image.path;
            //La url de la imagen, nos sale todo el directorio entero, por tanto tenemos que recortar la url:
            //Con el metodo SPLIT 
            var file_split = file_path.file.split('\\');
            //Recojo el nombre que este en la posición número 2
            var file_name = file_split[2];
    
            //Si yo quiero sacar la extensión de la imagen:
            var ext_split = file.name.path('\.');
            //Recojo la extensión (.png, .jpg...)
            var file_ext = ext_split[1];
    
            //Compruebo que la imagen tiene la extensión correcta
            if(file_ext == 'png' || file_ext =='jpg' || file_ext == 'gif'){
                //Hago un Find & Update para actualizar la imagen del usuario
                Artist.findByIdAndUpdate(ArtistId, {image:file_name}, (err, ArtistUpdated) =>{
                    if(!ArtistId){
                        res.status(404).send({message: 'Se ha podido actualizar el artista'});
                    }else{
                        res.status(200).send({Artist: ArtistUpdated});
                    }
                });
            }else{
                res.status(404).send({message: 'Extensión del archivo no válida'});
            }
    
            console.log(file_split);
        }else{
            //Si el usuario no ha subido ninguna imagen
            res.status(404).send({message: 'No has subido ninguna imagen'});
        }
    }
    
    
    //Metodo para que nos devuelva un fichero de imagen, es decir: le pasaremos el nombre de un fichero y nos lo devuelva directamente
        //Nos haga una response (res) una respuesta http con el fichero tal cual, en este caso, una imagen
        //Esto se hace para securizar lo ficheros del servidor porque siempre voy a pasar por un metodo de la api
        //Y no vamos a saber la ruta de la imagen. Se accederá a bajo nivel y estará protegido con autentificación
        //
        //Para esto, tenemos que importar primeramente los modulos fs y path
    
        function getImageFile(req, res){
            var imageFile = req.params.image_file;
            var path_file = './uploads/artists/' + imageFile;
            //Compruebo si existe un fichero en el servidor
            fs.exists(path_file, function(exists){
                if (exists) {
                    res.sendFile(path_file);
                }else{
                    res.status(404).send({message: 'No existe la imagen...'});
                }
            });
    
        }
    
    



//para poder utilizar los metodos que utilizar en nuestro controlador:
module.exports = {
    getArtist,
    saveArtist, 
    getArtists,
    updateArtist, 
    deleteArtist, 
    uploadImage,
    getImageFile
};

