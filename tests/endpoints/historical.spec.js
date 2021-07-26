const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const checkBasicProperties = require('../checkBasicProperties');
const should = chai.should();

// remove null in array
const historicalColumns = require('../../assets/historicalColumns.json').filter(el => el);

chai.use(chaiHttp);

describe('TESTING /historical', () => {
    it('/historical correct type', (done) => {
        chai.request(app)
            .get('/historical')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'array');
                res.body.length.should.be.at.least(1);
                done();
            });
    });

    it('/historical correct properties', (done) => {
        chai.request(app)
            .get('/historical')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'array');
                for (const row of res.body) {
					// property check
                    historicalColumns.forEach(column => row.should.have.property(column));
					// exists check
					should.exist(row.ngay);
					should.exist(row.cong_dong);
					should.exist(row.tong_cong_dong);
                    should.exist(row.day_full);
				}
                done();
            });
    });
});