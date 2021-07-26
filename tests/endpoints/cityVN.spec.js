const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const checkBasicProperties = require('../checkBasicProperties');

chai.use(chaiHttp);

describe('TESTING /cityvn', () => {
    it('/cityvn correct type', (done) => {
        chai.request(app)
            .get('/cityvn')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'array');
                res.body.length.should.be.at.least(1);
                done();
            });
    });
});