/* eslint-disable no-inline-comments */
/* eslint-disable no-trailing-spaces */
const getWorldOMeter = require('../scrapers/wordometers');
const vietnamData = require('../scrapers/ncov');
const log = require('../utils/log');

module.exports = {
    executeBigScraper: async () => {
        await Promise.all([
            vietnamData(),
        ]);
        log.info('Finished big scrapping!');
    },
    executeSmallScraper: async () => {
        await Promise.all([
            getWorldOMeter(),
        ]);
        log.info('Finished small scrapping!');
    },
};