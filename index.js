var Express = require('express'),
    Server = Express(),
    bodyParser = require('body-parser'),
    MethodOverride = require('method-override'),
    Router = Express.Router(),
    Mongoose = require('mongoose'),
    Config = require('./config.json'),
    Model = require('./Models/UserModel'),
    UserCtrl = require('./Controllers/UserController');

//Express Middleware config
Server.use(bodyParser.urlencoded({extended: true}));
Server.use(bodyParser.json());
Server.use(MethodOverride());

Mongoose.connect('mongodb://' + Config.DbHost + '/' + Config.db, function (err, res) {
    if (err) {
        console.log('Error: Database connection failed ...' + err);
    }else{
        Server.listen(Config.port, function () {
            console.log('Node server running on http://localhost:' + Config.port);
        });
    }
});

//Route config

Router.route('/').get(function (req, res) {
    res.jsonp({name: 'Index'});
});

Router.route('/users')
    .get(UserCtrl.findAllUsers)
    .post(UserCtrl.addUser);

Router.route('/users/:id')
    .get(UserCtrl.findById)
    .put(UserCtrl.updateUser)
    .delete(UserCtrl.deleteUser);

Server.use('/', Router);

