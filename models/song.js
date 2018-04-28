'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = Schema({
        number: String,
        name: String,
        duration: String,
        file: String, 
        Role: String,
        album: {type: Schema.objectId, ref: 'Album'}
});

module.exports = mongoose.model('Song', SongSchema);