/**
 * DatabaseID: USToday/USYesterday
 * Interval: 10m
 */

const axios = require('axios');
const cheerio = require('cheerio').default;
const log = require('../utils/log');
const { set } = require('../handlers/database');

const parseNumberCell = (cell) => {
    const cellValue = cell.children.length !== 0 ? cell.children[0].data : '';
    return parseFloat(cellValue.replace(/[,+\-\s]/g, '')) || null;
};

const fillResult = (html, yesterday = false) => {
    const statesTable = html(yesterday ? 'table#usa_table_countries_yesterday' : 'table#usa_table_countries_today');
    const tableRows = statesTable
        .children('tbody')
        .children('tr:not(.total_row)').get();
    const stateColIndex = 1;
    const dataColIndexes = {
        cases: 2,
        todayCases: 3,
        deaths: 4,
        todayDeaths: 5,
        recovered: 6,
        active: 7,
        casesPerOneMillion: 8,
        deathsPerOneMillion: 9,
        tests: 10,
        testsPerOneMillion: 11,
        population: 12,
    };

    return tableRows.map((row) => {
        const cells = row.children.filter(el => el.name === 'td');
        const stateData = { state: cheerio(cells[stateColIndex]).text().replace(/\n/g, '').trim(), updated: Date.now() };
        Object.keys(dataColIndexes).forEach((property) => stateData[property] = parseNumberCell(cells[dataColIndexes[property]]));
        return stateData;
    });
};

const getStates = async () => {
    try {
        const response = await axios.get('https://www.worldometers.info/coronavirus/country/us/');
        const html = cheerio.load(response.data);
        const statesData = fillResult(html).filter(el => el.state != "USA Total");
        await set('USToday', statesData);
        log.info(`Updated states: ${statesData.length} states`);

        const statesYesterday = fillResult(html, true).filter(el => el.state != "USA Total");
        await set('USYesterday', statesYesterday);
        log.info(`Updated yesterday states: ${statesData.length} states`);
    } catch (err) {
        log.err('Error: states scraper failed!', err);
        return;
    }

};

module.exports = getStates;