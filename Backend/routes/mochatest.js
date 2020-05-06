var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Book App', function(){

    it('GET /booksCount - Verifying books count',function(done){
        agent.get('/booksCount')
            .then(function(res){
                expect(res.body.count).to.equal(3);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    it('GET /usersCount - Verifying users count',function(done){
        agent.get('/usersCount')
            .then(function(res){
                expect(res.body.count).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})