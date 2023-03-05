import * as cheerio from 'cheerio';
import { request } from 'undici';
import { info, error } from '../utils/log';
import { set } from '../database';
import { getCountryData } from '../utils/utils';
const columns: string[] = ['index', 'country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'todayRecovered', 'active', 'critical'];

// Returns country data list ordered by country name
const getOrderByCountryName = (data) => data.sort((a, b) => a.country < b.country ? -1 : 1);

// Maps a row from worldometers to a country
const mapRows = (_, row):WOMCountryData=> {
	const entry = { updated: Date.now(), countryInfo: { _id: null, iso2: null, iso3: null, lat: 0, long: 0 }, active: 0, cases: 0, recovered: 0, deaths: 0, critical: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0, country: '' };
	const replaceRegex = /(\n|,)/g;
	cheerio.load(row)('td').each((index, cell: any) => {
		const selector: any = columns[index];
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
		const res = await request('https://www.worldometers.info/coronavirus/');
		const html = cheerio.load(await res.body.text());
		['today', 'yesterday'].forEach(key => {
			const data = fillResult(html, key);
			set(key === 'today' ? 'womToday' : 'womYesterday', [data.world, ...getOrderByCountryName(data.countries)]);
			info(`Updated ${key} countries statistics: ${data.countries.length + 1}`);
		});
	} catch (err) {
		error('Error: Requesting WorldoMeters failed!', err);
	}
};

export default getWorldometerPage;

export interface WOMCountryData {
	"updated": number,
    "countryInfo": {
        "_id": number,
        "iso2": string,
        "iso3": string,
        "lat": number,
        "long": number
    },
    "active": number | null,
    "cases": number,
    "recovered": number,
    "deaths": number,
    "country": string,
    "todayCases": number | null,
    "todayDeaths": number | null,
    "todayRecovered": number | null,
    "critical": number | null
}

export interface WOMWorldData{
    "updated": number,
    "active": number,
    "cases": number,
    "recovered": number,
    "deaths": number,
    "critical": number,
    "todayCases": number,
    "todayDeaths": number,
    "todayRecovered": number,
    "affectedCountries": number
}