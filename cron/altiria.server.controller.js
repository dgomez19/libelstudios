'use strict';

var path           = require('path');
var appRoot        = path.resolve(__dirname);
var config         = require(appRoot + '/../config.js');
var mongoose       = require('mongoose');
var querystring    = require('querystring');
var http           = require('http');

// var Altirium       = require( appRoot + '/../models/altirium.server.model.js');
// var Altirium       = mongoose.model('Altirium');

mongoose.connect('mongodb://' + config.config.mongo.url + '/' + config.config.mongo.name, {useUnifiedTopology: true, useNewUrlParser : true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("exito");
});