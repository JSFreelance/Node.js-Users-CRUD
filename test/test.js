var supertest = require('supertest');
var should = require('should');
var config = require('../config');
var server = supertest.agent('http://localhost:' + config.port);


describe('Sample unit test', function () {

    //It should return home page
    it('GET / should return a index response', function (done) {
        server.get('/')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.error.should.equal(false);
                res.body.name.should.equal('Index');
                done();
            });
    });

    it('GET /users should return a list of users', function (done) {
        server.get('/users')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {

                res.status.should.equal(200);
                res.error.should.equal(false);

                res.body[0].should.have.property('firstName').should.not.equal(null);
                res.body[0].should.have.property('lastName').should.not.equal(null);
                res.body[0].should.have.property('email').should.not.equal(null);
                done();
            });
    });

    it('POST /users It would receive a valid json and the response should return it', function (done) {
        var data = {
            firstName: 'Test',
            lastName: 'Test',
            email: 'Test'
        };
        server.post('/users')
            .send(data)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, req) {
                if (err) {
                    console.log(err);
                } else {
                    req.body.should.have.property('firstName').should.not.equal(null);
                    req.body.should.have.property('lastName').should.not.equal(null);
                    req.body.should.have.property('email').should.not.equal(null);
                }
                done();
            });
    });

    it('GET /users/:id should return a user if exists or null if not', function (done) {

        //Get test object created in database
        var testObjId = '576d3716afb6ebd211000023';

        var retrieveUserById = function (id) {
            server.get('/users/' + testObjId)
                .expect('Content-type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        res.body.should.eql({});
                    } else {
                        res.body.should.have.property('firstName').should.not.equal(null);
                        res.body.should.have.property('lastName').should.not.equal(null);
                        res.body.should.have.property('email').should.not.equal(null);
                    }
                });
        };

        //Retrieve an existing object from db
        retrieveUserById(testObjId);

        //Retrieve from db an object that does not exists
        retrieveUserById(1);
        done();
    });

    it('PUT /users/:id should update a user by id', function (done) {

        var userId = '576d3934afb6ebd211000029';

        var updateUserById = function (id) {
            var data = {
                firstName: 'TestPUT',
                lastName: 'TestPUT',
                email: 'TestPUT'
            };

            server.put('/users/' + id)
                .send(data)
                .end(function (err, req) {
                    if (err) {
                        req.error.status.should.eql(500);
                    } else {
                        req.body.should.have.property('firstName').should.not.equal(null);
                        req.body.should.have.property('lastName').should.not.equal(null);
                        req.body.should.have.property('email').should.not.equal(null);
                    }
                });
        };

        //Update an existing user
        updateUserById(userId);

        //Update a user that does not exist
        updateUserById(1);

        done();
    });

    it('DELETE /users/:id should delete a user by id', function (done) {

        var userId = '576d51c2821e981634000001';

        var deleteUserById = function (id) {
            server.delete('/users/' + id)
                .expect('Content-type', /json/)
                .expect(200)
                .end(function (err, req) {
                    if (err) {
                        req.error.status.should.eql(500);
                    }
                });
        };

        //Delete an existing user
        deleteUserById(userId);

        //Delete a user that does not exist
        deleteUserById(1);

        done();
    });
});