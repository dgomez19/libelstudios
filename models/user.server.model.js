var mongoose  = require('mongoose');
var validator = require('validator');


var validateLocalStrategyEmail = function (email) {
    return validator.isEmail(email, { require_tld: false });
};

const UserSchema = new mongoose.Schema({
    name : {
        type     : String,
        trim     : true,
        required : 'Por favor ingrese un nombre',
    },
    username: {
        type      : String,
        unique    : 'El nombre de usuario ya existe',
        required  : 'Por favor ingrese un nombre de usuario',
        lowercase : true,
        trim      : true
    },
    email: {
        type      : String,
        lowercase : true,
        trim      : true,
        default   : '',
        required  : 'Por favor ingrese un email',
        validate  : [validateLocalStrategyEmail, 'Por favor ingrese un email valido']
    },
    address : {
        type    : String,
        trim    : true,
        required : 'Por favor ingrese una dirección',
    },
    phone : {
        type    : String,
        trim    : true,
        default : '',
        required : 'Por favor ingrese un número de teléfono',
    },
    password: {
        type    : String,
        default : '',
        required : 'Por favor ingrese una contraseña',
    },
    status: {
        type    : Boolean,
        default : true,
    },
});

const User = mongoose.model('User', UserSchema);