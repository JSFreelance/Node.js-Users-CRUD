var mongoose = require('mongoose');
var Users = mongoose.model('User');

//GET - Return all users
exports.findAllUsers = function (req, res) {
    Users.find(function (err, users) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(users);
    });
};

//POST - Insert a new User in the DB
exports.addUser = function (req, res) {
    var user = new Users({name: req.body.name});

    user.save(function (err, user) {
        if (err) return res.status(500).send(err.message);

        res.status(200).jsonp(user);
    });
};

//GET - Return users by id
exports.findById = function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        if (err) return res.send(500, err.message);
        console.log('GET /user/' + req.params.id);
        res.status(200).jsonp(user);
    });
};

//PUT - Update a user already exists
exports.updateUser = function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        user.name = req.body.name;
        user.save(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a User by ID
exports.deleteUser = function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        user.remove(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};











