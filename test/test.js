var supertest = require('supertest');
var should = require('should');

var server = supertest.agent('http://localhost:8082');

describe('Sample unit test', function () {
    //1 should return home page
    it('should return home page', function (done) {
        server.get('/')
            .expect('Content-type',/json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.error.should.equal(false);
                res.body.name.should.equal('Index');
                done();
            });
    });
});