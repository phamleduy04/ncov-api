/* eslint-disable no-inline-comments */
/* eslint-disable no-trailing-spaces */
const getWorldOMeter = require('../scrapers/wordometers');
const getcityVietnam = require('../scrapers/cityVN');
const getHistorical = require('../scrapers/historical');
const getStates = require('../scrapers/states');
const log = require('../utils/log');

module.exports = {
    executeBigScraper: async () => {
        await Promise.all([
        ]);
        log.info('Finished big scrapping!');
    },
    executeSmallScraper: async () => {
        await Promise.all([
            getWorldOMeter(),
            getHistorical(),
            getcityVietnam(),
            getStates(),
        ]);
        log.info('Finished small scrapping!');
    },
};