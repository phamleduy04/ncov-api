/**
 * Database ID: ncov
 * Interval: 10m
 */

const columns = ['index', 'country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'todayRecovered', 'active', 'critical'];
const axios = require('axios');
const cheerio = require('cheerio').default;
const log = require('../utils/log');
const { set } = require('../handlers/database');
const { getCountryData } = require('../utils/utils');

// Returns country data list ordered by country name
const getOrderByCountryName = (data) => data.sort((a, b) => a.country < b.country ? -1 : 1);

// Maps a row from worldometers to a country
const mapRows = (_, row) => {
	const entry = { updated: Date.now() };
	const replaceRegex = /(\n|,)/g;
	cheerio(row).children('td').each((index, cell) => {
		const selector = columns[index];
        if (!selector) return;
		cell = cheerio.load(cell);
		switch (index) {
			case 0:
				break;
			case 1: {
				const countryInfo = getCountryData(cell.text().replace(replaceRegex, ''));
				entry[selector] = countryInfo.country || cell.text().replace(replaceRegex, '');
				delete countryInfo.country;
				entry.countryInfo = countryInfo;
				break;
			}
			default:
				entry[selector] = parseFloat(cell.text().replace(replaceRegex, '')) || null;
		}
	});
	!entry.active && (entry.active = entry.cases - entry.recovered - entry.deaths);
	return entry;
};

// Fills an array full of table data parsed from worldometers
 function fillResult(html, idExtension) {
	const countriesTable = html(`table#main_table_countries_${idExtension}`);
	const countries = countriesTable.children('tbody:first-of-type').children('tr:not(.row_continent)').map(mapRows).get();
	const world = countries.shift();
	return { world, countries };
}

// Scrap and update to mongodb
 const getWorldometerPage = async () => {
	try {
        const res = await axios.get('https://www.worldometers.info/coronavirus');
		const html = cheerio.load(res.data);
		['today', 'yesterday'].forEach(key => {
			const data = fillResult(html, key);
			set(key === 'today' ? 'womToday' : 'womYesterday', [data.world, ...getOrderByCountryName(data.countries)]);
			log.info(`Updated ${key} countries statistics: ${data.countries.length + 1}`);
		});
	} catch (err) {
		log.err('Error: Requesting WorldoMeters failed!', err);
	}
};

module.exports = getWorldometerPage;