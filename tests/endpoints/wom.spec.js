/* eslint-disable max-nested-callbacks */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const checkBasicProperties = require('../checkBasicProperties');
const should = chai.should();
const expect = chai.expect();

const countryList = require('../../assets/countries.json');

chai.use(chaiHttp);

describe('TESTING /wom', () => {
    it('/wom correct type', (done) => {
        chai.request(app)
            .get('/wom')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'object');
                res.body.should.have.property('updated');
				should.exist(res.body.cases);
                res.body.should.have.property('cases');
				should.exist(res.body.cases);
				res.body.should.have.property('todayCases');
				should.exist(res.body.todayCases);
				res.body.should.have.property('deaths');
				should.exist(res.body.deaths);
				res.body.should.have.property('todayDeaths');
				should.exist(res.body.todayDeaths);
				res.body.should.have.property('recovered');
				should.exist(res.body.recovered);
                res.body.should.have.property('todayRecovered');
				should.exist(res.body.todayRecovered);
                res.body.should.have.property('active');
				should.exist(res.body.active);
                res.body.should.have.property('critical');
				should.exist(res.body.critical);
                res.body.should.have.property('affectedCountries');
				should.exist(res.body.affectedCountries);
                done();
            });
    });
});

describe('TESTING /wom?yesterday=true', () => {
    it('/wom?yesterday=true correct type', (done) => {
        chai.request(app)
            .get('/wom?yesterday=true')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'object');
                res.body.should.have.property('updated');
				should.exist(res.body.cases);
                res.body.should.have.property('cases');
				should.exist(res.body.cases);
				res.body.should.have.property('todayCases');
				res.body.should.have.property('deaths');
				should.exist(res.body.deaths);
				res.body.should.have.property('todayDeaths');
				should.exist(res.body.todayDeaths);
				res.body.should.have.property('recovered');
				should.exist(res.body.recovered);
                res.body.should.have.property('todayRecovered');
				should.exist(res.body.todayRecovered);
                res.body.should.have.property('active');
				should.exist(res.body.active);
                res.body.should.have.property('critical');
				should.exist(res.body.critical);
                res.body.should.have.property('affectedCountries');
				should.exist(res.body.affectedCountries);
                done();
            });
    });

    it('/wom?yesterday=true correct type', (done) => {
        chai.request(app)
            .get('/wom?yesterday=true')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'object');
                res.body.should.have.property('updated');
				should.exist(res.body.cases);
                res.body.should.have.property('cases');
				should.exist(res.body.cases);
				res.body.should.have.property('todayCases');
				should.exist(res.body.todayCases);
				res.body.should.have.property('deaths');
				should.exist(res.body.deaths);
				res.body.should.have.property('todayDeaths');
				should.exist(res.body.todayDeaths);
				res.body.should.have.property('recovered');
				should.exist(res.body.recovered);
                res.body.should.have.property('todayRecovered');
				should.exist(res.body.todayRecovered);
                res.body.should.have.property('active');
				should.exist(res.body.active);
                res.body.should.have.property('critical');
				should.exist(res.body.critical);
                res.body.should.have.property('affectedCountries');
				should.exist(res.body.affectedCountries);
                done();
            });
    });
});

describe('TESTING /wom/countries', () => {
    it('/wom/countries correct type', (done) => {
        chai.request(app)
            .get('/wom/countries')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'array');
                res.body.length.should.be.at.least(1);
                done();
            });
    });

    it('/wom/countries/VN correct properties', (done) => {
        chai.request(app)
            .get('/wom/countries/VN')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'object');
                res.body.should.have.property('updated');
                res.body.should.have.property('country').eql('Vietnam');
                res.body.should.have.property('countryInfo');
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('recovered');
                res.body.should.have.property('active');
                res.body.should.have.property('critical');
                done();
            });
    });

    it('/wom/countries/VN?yesterday correct properties', (done) => {
        chai.request(app)
            .get('/wom/countries/VN?yesterday=true')
            .end((err, res) => {
                checkBasicProperties(err, res, 200, 'object');
                res.body.should.have.property('updated');
                res.body.should.have.property('country').eql('Vietnam');
                res.body.should.have.property('countryInfo');
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('recovered');
                res.body.should.have.property('active');
                res.body.should.have.property('critical');
                done();
            });
    });

    it('/wom/countries/ get correct alternate name', (done) => {
		chai.request(app)
			.get('/wom/countries/viet%20nam')
			.end((err, res) => {
				checkBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('Vietnam');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

    it('/wom/countries/?yesterday get correct alternate name', (done) => {
		chai.request(app)
			.get('/wom/countries/viet%20nam?yesterday=true')
			.end((err, res) => {
				checkBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('Vietnam');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

    it('/wom/countries/ get correct ios2', (done) => {
		chai.request(app)
			.get('/wom/countries/vn')
			.end((err, res) => {
				checkBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('Vietnam');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

    it('/wom/countries/?yesterday get correct ios2', (done) => {
		chai.request(app)
			.get('/wom/countries/vn?yesterday=true')
			.end((err, res) => {
				checkBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('Vietnam');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

    it('/wom/countries/ get correct id', (done) => {
		chai.request(app)
			.get('/wom/countries/704')
			.end((err, res) => {
				checkBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('Vietnam');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

    it('/wom/countries/?yesterday get correct id', (done) => {
		chai.request(app)
			.get('/wom/countries/704?yesterday=true')
			.end((err, res) => {
				checkBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('Vietnam');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

    it('/wom/countries/ get incorrect country name', (done) => {
		chai.request(app)
			.get('/wom/countries/ajsdhjashfjkas')
			.end((err, res) => {
				checkBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

    it('/wom/countries/?yesterday get incorrect country name', (done) => {
		chai.request(app)
			.get('/wom/countries/ajsdhjashfjkas?yesterday=true')
			.end((err, res) => {
				checkBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

    // test all countries
    countryList.forEach(el => {
        it(`/wom/countries/${el.country} correct country name`, (done) => {
			chai.request(app)
				.get(`/wom/countries/${el.country}`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.country.should.equal(el.country);
						res.body.should.have.property('countryInfo');
						res.body.should.have.property('cases');
						res.body.should.have.property('todayCases');
						res.body.should.have.property('deaths');
						res.body.should.have.property('todayDeaths');
						res.body.should.have.property('recovered');
                        res.body.should.have.property('todayRecovered');
						res.body.should.have.property('active');
						res.body.should.have.property('critical');
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
    });

describe('TESTING /wom/state', () => {
	it('/wom/state', (done) => {
		chai.request(app)
			.get('/wom/state')
			.end((err, res) => {
				checkBasicProperties(err, res, 200, 'array');
				for (const row of res.body) {
					// property check
					row.should.have.property('state');
					row.should.have.property('updated');
					row.should.have.property('cases');
					row.should.have.property('todayCases');
					row.should.have.property('deaths');
					row.should.have.property('todayDeaths');
					row.should.have.property('active');
					row.should.have.property('tests');
					row.should.have.property('population');
					row.should.have.property('testsPerOneMillion');
					// exists check
					should.exist(row.cases);
					should.exist(row.updated);
					should.exist(row.state);
				}
			done();
		});
	});

	it('/wom/state?yesterday=true', (done) => {
		chai.request(app)
			.get('/wom/state?yesterday=true')
			.end((err, res) => {
				checkBasicProperties(err, res, 200, 'array');
				for (const row of res.body) {
					// property check
					row.should.have.property('state');
					row.should.have.property('updated');
					row.should.have.property('cases');
					row.should.have.property('todayCases');
					row.should.have.property('deaths');
					row.should.have.property('todayDeaths');
					row.should.have.property('active');
					row.should.have.property('tests');
					row.should.have.property('population');
					row.should.have.property('testsPerOneMillion');
					// exists check
					should.exist(row.cases);
					should.exist(row.updated);
					should.exist(row.state);
				}
				done();
			});
	});

	it('/wom/state search works', (done) => {
		chai.request(app)
			.get('/wom/state/Texas')
			.end((err, res) => {
				checkBasicProperties(err, res, 200, 'object');
				res.body.state.should.equal('Texas');
				res.body.should.have.property('updated');
				res.body.should.have.property('cases');
				res.body.should.have.property('todayCases');
				res.body.should.have.property('deaths');
				res.body.should.have.property('todayDeaths');
				res.body.should.have.property('recovered');
				res.body.should.have.property('active');
				res.body.should.have.property('casesPerOneMillion');
				res.body.should.have.property('deathsPerOneMillion');
				res.body.should.have.property('tests');
				res.body.should.have.property('testsPerOneMillion');
				res.body.should.have.property('population');
				done();
			});
	});

	it('/wom/state?yesterday search works', (done) => {
		chai.request(app)
			.get('/wom/state/Texas?yesterday=true')
			.end((err, res) => {
				checkBasicProperties(err, res, 200, 'object');
				res.body.state.should.equal('Texas');
				res.body.should.have.property('updated');
				res.body.should.have.property('cases');
				res.body.should.have.property('todayCases');
				res.body.should.have.property('deaths');
				res.body.should.have.property('todayDeaths');
				res.body.should.have.property('recovered');
				res.body.should.have.property('active');
				res.body.should.have.property('casesPerOneMillion');
				res.body.should.have.property('deathsPerOneMillion');
				res.body.should.have.property('tests');
				res.body.should.have.property('testsPerOneMillion');
				res.body.should.have.property('population');
				done();
			});
	});

	it('/wom/state incorrect state name', (done) => {
		chai.request(app)
			.get('/wom/state/asjdhajskhfjkashjfk')
			.end((err, res) => {
				checkBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/wom/state?yesterday incorrect state name', (done) => {
		chai.request(app)
			.get('/wom/state/asjdhajskhfjkashjfk?yesterday=true')
			.end((err, res) => {
				checkBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/wom/state?yesterday is less than today', (done) => {
		chai.request(app)
			.get('/wom/state/texas?yesterday=true')
			.end((err, yesterdayRes) => {
				checkBasicProperties(err, yesterdayRes, 200, 'object');
				chai.request(app)
					.get('/wom/state/texas')
					.end((err2, todayRes) => {
						checkBasicProperties(err2, todayRes, 200, 'object');
						todayRes.body.cases.should.be.at.least(yesterdayRes.body.cases);
						done();
					});
			});
	});

});

});