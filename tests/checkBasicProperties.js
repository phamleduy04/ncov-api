const chai = require('chai');
const should = chai.should();

const checkBasicProperties = (err, res, expectedStatus, expectedType) => {
    should.not.exist(err);
    should.exist(res);
    res.should.have.status(expectedStatus);
    res.body.should.be.a(expectedType);
};

module.exports = checkBasicProperties;