/**
 * Database ID: ncovcity
 * Interval: 10m
 */

const axios = require('axios');
const cheerio = require('cheerio').default;
const log = require('../utils/log');
const columns = ['dia_diem', 'tong_ca_nhiem', 'hom_nay', 'tu_vong'];
const { set } = require('../handlers/database');

const mapRows = (_, row) => {
	const city = { updatedAt: Date.now() };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
            case 0:
                city[columns[index]] = cell.text();
                break;
            default:
				city[columns[index]] = cell.text() && cell.text().length != 0 ? parseInt(cell.text().replace('.', '')) : null;
				break;
		}
	});
	return city;
};

const processCityVN = async () => {
    try {
        const url = `https://ncov.moh.gov.vn/`;
        const html = cheerio.load((await axios.default({ method: 'GET', url, httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) })).data);
        const res = html('table#sailorTable').children('tbody:first-of-type').children('tr').map(mapRows).get().filter(el => Object.keys(el).length !== 0 && el.dia_diem);
        await set('ncovcity', res);
        log.info(`NCOVcity Scraper success! ${res.length} cities`);
    }
    catch (err) {
        log.err('NCOV-ALL failed!', err);
        return null;
    }
};

module.exports = processCityVN;