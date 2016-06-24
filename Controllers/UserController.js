var mongoose = require('mongoose');
var users = mongoose.model('users');

//GET - Return all users
exports.findAllUsers = function (req, res) {
    users.find(function (err, userList) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(userList);
    });
};

//POST - Insert a new User in the DB
exports.addUser = function (req, res) {
    var user = new users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    user.save(function (err, newUser) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(newUser);
    });
};

//GET - Return users by id
exports.findById = function (req, res) {
    users.findById(req.params.id, function (err, user) {
        if (err) return res.send(500, err.message);
        console.log('GET /user/' + req.params.id);
        res.status(200).jsonp(user);
    });
};

//PUT - Update a user already exists
exports.updateUser = function (req, res) {
    users.findById(req.params.id, function (err, user) {
        if(err) return res.status(500).jsonp(err.message);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;

        user.save(function (err) {
            if (err) return res.status(500).jsonp(err.message);
            res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a User by ID
exports.deleteUser = function (req, res) {
    users.findById(req.params.id, function (err, user) {
        user.remove(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};