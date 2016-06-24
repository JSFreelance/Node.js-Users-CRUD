var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('./config.json');
var model = require('./Models/UserModel');
var userCtrl = require('./Controllers/UserController');

//Express Middleware config
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(methodOverride());

mongoose.connect('mongodb://' + config.DbHost + '/' + config.db, function (err, res) {
    if (err) {
        console.log('Error: Database connection failed ...' + err);
    } else {
        server.listen(config.port, function () {
            console.log('Node server running on http://localhost:' + config.port);
        });
    }
});

//Route config

router.route('/').get(function (req, res) {
    res.jsonp({name: 'Index'});
});

router.route('/users')
    .get(userCtrl.findAllUsers)
    .post(userCtrl.addUser);

router.route('/users/:id')
    .get(userCtrl.findById)
    .put(userCtrl.updateUser)
    .delete(userCtrl.deleteUser);

server.use('/', router);