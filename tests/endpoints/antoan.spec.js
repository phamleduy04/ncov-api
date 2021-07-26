const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const checkBasicProperties = require('../checkBasicProperties');
const should = chai.should();

chai.use(chaiHttp);

describe('TESTING /antoan', () => {
    it('/antoan correct type', (done) => {
        chai.request(app)
            .get('/antoan')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'array');
                res.body.length.should.be.at.least(1);
                done();
            });
    });

    it('/antoan correct properties', (done) => {
        chai.request(app)
            .get('/antoan')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'array');
                for (const row of res.body) {
					// property check
					row.should.have.property('updatedAt');
					row.should.have.property('dia_diem');
					row.should.have.property('an_toan');
					row.should.have.property('co_rui_ro');
					row.should.have.property('khong_an_toan');
                    row.should.have.property('chua_danh_gia');
                    row.should.have.property('ty_le_an_toan');
                    row.should.have.property('muc_do_an_toan');

					// exists check
					should.exist(row.updatedAt);
					should.exist(row.dia_diem);
					should.exist(row.an_toan);
                    should.exist(row.co_rui_ro);
                    should.exist(row.khong_an_toan);
                    should.exist(row.chua_danh_gia);
                    should.exist(row.ty_le_an_toan);
                    should.exist(row.muc_do_an_toan);
				}
                done();
            });
    });
});