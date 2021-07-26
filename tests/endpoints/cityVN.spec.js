const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const checkBasicProperties = require('../checkBasicProperties');
const should = chai.should();

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

    it('/cityvn correct properties', (done) => {
        chai.request(app)
            .get('/cityvn')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'array');
                for (const row of res.body) {
					// property check
					row.should.have.property('updatedAt');
					row.should.have.property('dia_diem');
					row.should.have.property('tong_ca_nhiem');
					row.should.have.property('hom_nay');
					row.should.have.property('tu_vong');
					// exists check
					should.exist(row.updatedAt);
					should.exist(row.dia_diem);
					should.exist(row.tong_ca_nhiem);
                    should.exist(row.hom_nay);
                    should.exist(row.tu_vong);
				}
                done();
            });
    });
});