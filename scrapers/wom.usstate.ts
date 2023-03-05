import * as cheerio from 'cheerio';
import * as log from '../utils/log';

import { request } from 'undici';
import { set } from '../database';

const parseNumberCell = (cell) => {
    const cellValue = cell.children.length !== 0 ? cell.children[0].data : '';
    return parseFloat(cellValue.replace(/[,+\-\s]/g, '')) || null;
};

const fillResult = (html:cheerio.Root, yesterday = false):WOMUsState[] => {
    const statesTable = html(yesterday ? 'table#usa_table_countries_yesterday' : 'table#usa_table_countries_today');
    const tableRows = statesTable.children('tbody').children('tr:not(.total_row)').get();
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
        const stateData = { state: cheerio.load(cells[stateColIndex])('td').text().replace(/\n/g, '').trim(), updated: Date.now(), cases: 0, todayCases: 0, deaths: 0, todayDeaths: 0, recovered: 0, active: 0, casesPerOneMillion: 0, deathsPerOneMillion: 0, tests: 0, testsPerOneMillion: 0, population: 0 };
        Object.keys(dataColIndexes).forEach((property) => stateData[property] = parseNumberCell(cells[dataColIndexes[property]]));
        return stateData;
    });
};

const getStates = async ():Promise<void> => {
    try {
        const response = await request('https://www.worldometers.info/coronavirus/country/us/').then(res => res.body.text());
        const html = cheerio.load(response);
        const statesData:WOMUsState[] = fillResult(html).filter(el => el.state !== 'USA Total');
        await set('USToday', statesData);
        log.info(`Updated US states: ${statesData.length} states`);

        const statesYesterday:WOMUsState[] = fillResult(html, true).filter(el => el.state !== 'USA Total');
        await set('USYesterday', statesYesterday);
        log.info(`Updated US states yesterday: ${statesYesterday.length} states`);
    }
    catch (err) {
        log.error('Error getting US states', err);
        return;
    }
};

export interface WOMUsState {
    state: string,
    updated: number,
    cases: number,
    todayCases: number,
    deaths: number,
    todayDeaths: number,
    recovered: number,
    active: number,
    casesPerOneMillion: number,
    deathsPerOneMillion: number,
    tests: number,
    testsPerOneMillion: number,
    population: number,
}

export default getStates;