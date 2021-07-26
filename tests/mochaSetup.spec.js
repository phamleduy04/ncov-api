const { executeSmallScraper, executeBigScraper } = require('../handlers/instances');
const logger = require('../utils/log');
const { reset } = require('../handlers/database');

before(async () => {
    await reset();
    logger.info('Finished flush all data from database');
    await Promise.all([
        executeSmallScraper(),
        executeBigScraper(),
    ]);
    logger.info('Scraping all data finished');
});