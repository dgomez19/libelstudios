var express    = require("express");
global.app     = express();
var path       = require('path');
var appRoot    = path.resolve(__dirname);
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var appRoot    = path.resolve(__dirname);
var config         = require(appRoot + '/config.js');


app.use(bodyParser.urlencoded({extended : true}));

require(appRoot + '/cron/users.server.controller.js');

var port = app.listen("3000");
console.log("CORRO POR EL PUERTO 3000");


mongoose.connect('mongodb://' + config.config.mongo.url + '/' + config.config.mongo.name, {useUnifiedTopology: true, useNewUrlParser : true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("exito");
});
