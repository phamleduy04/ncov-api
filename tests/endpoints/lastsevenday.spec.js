const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const checkBasicProperties = require('../checkBasicProperties');
const should = chai.should();

chai.use(chaiHttp);

describe('TESTING /lastsevenday', () => {
    it('/lastsevenday correct type', (done) => {
        chai.request(app)
            .get('/lastsevenday')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'array');
                res.body.length.should.be.at.least(1);
                done();
            });
    });

    it('/lastsevenday correct properties', (done) => {
        chai.request(app)
            .get('/lastsevenday')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'array');
                for (const row of res.body) {
					// property check
					row.should.have.property('date');
					row.should.have.property('death');
					row.should.have.property('treating');
					row.should.have.property('cases');
					row.should.have.property('recovered');
                    row.should.have.property('avgCases7day');
                    row.should.have.property('avgRecovered7day');
                    row.should.have.property('avgDeath7day');
					// exists check
					should.exist(row.date);
					should.exist(row.death);
					should.exist(row.treating);
                    should.exist(row.cases);
                    should.exist(row.recovered);
                    should.exist(row.avgCases7day);
                    should.exist(row.avgRecovered7day);
                    should.exist(row.avgDeath7day);
				}
                done();
            });
    });
});