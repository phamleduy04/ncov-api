/* eslint-disable no-inline-comments */
/* eslint-disable no-trailing-spaces */
const getWorldOMeter = require('../scrapers/wordometers');
const getVietnam = require('../scrapers/ncov');
const getHistorical = require('../scrapers/historical');
const log = require('../utils/log');

module.exports = {
    executeBigScraper: async () => {
        await Promise.all([
            getVietnam(),
        ]);
        log.info('Finished big scrapping!');
    },
    executeSmallScraper: async () => {
        await Promise.all([
            getWorldOMeter(),
            getHistorical(),
        ]);
        log.info('Finished small scrapping!');
    },
};