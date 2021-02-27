var jwt        = require('jsonwebtoken');
var bodyParser = require('body-parser');
var path       = require('path');
var appRoot    = path.resolve(__dirname);
var mongoose   = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit:'10mb'}));

var User         = require( appRoot + '/../models/user.server.model.js');
var User         = mongoose.model('User');
var errorHandler = require( appRoot + '/errors.server.controller.js');

app.post('/api/login', (req, res) => {

    var username = req.body.user;
    var password = req.body.password;

    User.findOne({ username : req.body.username, password : req.body.password }).exec(function (err, result) {

        if (err) {
            return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {

            if (result) {

                var tokenData = {
                    username: username
                };

                var token = jwt.sign(tokenData, 'Secret Password', {
                    expiresIn: 60 * 60 * 24 // expira en 24 horas
                });

                res.send({
                    token
                });
            } else {
                res.status(401).send({
                    error: 'usuario o clave de acceso inválidos'
                });
            }
        }
        
    });
});

/**
 * Creacion de usuarios
 */
app.post('/api/users', (req, res) => {

    var user = new User(req.body);

    user.save(function(err, result) {
        if (err) {
            return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json({ success : true, message : "Usuario almacenado exitosamente." });
        }
    });
});


/**
 * Listado de usuarios, no se muestra la contrasena por seguridad
 * solo lista los usuarios con estado "true"
 */
app.get('/api/users', (req, res) => {
    User.find({ status : true }, '-password').exec(function (err, result) {
        res.json(result);
    });
});


/**
 * Eliminar usuario
 * @param id recibo como valor el parametro del usuario
 */
app.delete('/api/users/:id', (req, res) => {

    var id = req.params.id || null;

    if (!id) {
        res.json({ success : false, message : "Registro invalido." });
        return false;
    }

    User.deleteOne({ _id : id }, function (err) {
        if (err) {
            return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json({ success : true, message : "Usuario eliminado exitosamente." });
        }
    });
});




/**
 * Actualizar usuario
 * @param id recibo como valor el parametro del usuario
 */
app.put('/api/users/:id', (req, res) => {

    var id = req.params.id || null;

    if (!id) {
        res.json({ success : false, message : "Registro invalido." });
        return false;
    }

    User.findOne({ _id : id }).exec(function (err, result) {
        if (err) {
            return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (result) {

                var user = new User(result);

                if (req.body.name) {
                    user.name = req.body.name;
                }

                if (req.body.username) {
                    user.username = req.body.username;
                }

                if (req.body.email) {
                    user.email = req.body.email;
                }

                if (req.body.address) {
                    user.address = req.body.address;
                }

                if (req.body.phone) {
                    user.phone = req.body.phone;
                }

                if (req.body.password) {
                    user.password = req.body.password;
                }

                if (req.body.status) {
                    user.status = req.body.status;
                }

                user.save(function(err) {
                    console.log(err);
                    if (err) {
                        return res.status(422).send({
                            message : errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.json({ success : true, message : "Registro actualizado exitosamente" });
                    }
                });
            } else {
                res.json({ success : true, message : "No se encontraron resultados." });
            }
        }
    });
});