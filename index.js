'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;
mongoose.connect('mongodb://localhost:27017/curso_mean2', (err, res) =>{
  if(err){
    throw err;
  }else {
    console.log("La conexión a la base de datos, funciona");

    app.listen(port, function(){
      console.log("Servidor del api rest de musica que se puede escuchar en http://localhost:", +port);
    })
  }
});

