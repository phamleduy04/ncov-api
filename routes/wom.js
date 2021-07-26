const router = require('express').Router();
const { get } = require('../handlers/database');
const { wordsStandardize, getCountryData } = require('../utils/utils');
const { getWorldometersData } = require('../utils/utils');

// get all data
router.get('/', async (req, res) => {
    const { yesterday = undefined } = req.query;
    const data = await getAllData(yesterday ? 'womYesterday' : 'womToday');
    return res.status(200).json(data);
});

// get all countries
router.get('/countries', async (req, res) => {
    const { yesterday = undefined } = req.query;
    let data = await get(yesterday ? 'womYesterday' : 'womToday');
    data = data.filter(el => el.country.toLowerCase() !== 'world').map(fixApostrophe).map(el => el);
    res.status(200).json(data);
});

// get data from countryname
router.get('/countries/:countryname', async (req, res) => {
    const { yesterday = undefined } = req.query;
    const { countryname } = req.params;
    let data = await get(yesterday ? 'womYesterday' : 'womToday');
    data = data.filter(el => el.country.toLowerCase() !== 'world').map(fixApostrophe).map(el => el);
    data = getWOHData(data, countryname);
    if (data) return res.status(200).json(data);
    return res.status(404).send({ message: 'not found!' });
});


// get all states of US
router.get('/state', async (req, res) => {
    const { yesterday = undefined } = req.query;
    const data = await get(yesterday ? 'USYesterday' : 'USToday');
    return res.status(200).json(data);
});

// search state of US
router.get('/state/:statename', async (req, res) => {
    const { yesterday = undefined } = req.query;
    const { statename } = req.params;
    const data = await get(yesterday ? 'USYesterday' : 'USToday');
    const stateData = data.find(el => el.state.toLowerCase() === statename.toLowerCase());
    if (stateData) return res.status(200).json(stateData);
    return res.status(404).json({ message: 'not found!' });
});


module.exports = router;

async function getAllData(key) {
    const countries = await get(key);
	const worldData = countries.find(countryData => countryData.country.toLowerCase() === 'world');
	worldData.affectedCountries = countries.length - 1;
	const { country, countryInfo, ...cleanedWorldData } = worldData;
	return cleanedWorldData;
}

// Fix apostrophes in country name
function fixApostrophe(country) {
    country.country = country.country.replace(/"/g, '\'');
	return country;
}

function getWOHData(data, nameParam) {
    const countryInfo = isNaN(nameParam) ? getCountryData(nameParam) : {};
    const standardizedName = wordsStandardize(countryInfo.country ? countryInfo.country : nameParam);
    return data.find((country) => {
        if (!isNaN(nameParam)) return country.countryInfo && country.countryInfo._id === Number(nameParam);
        if (country.continent && country.continent.includes('-')) return search(country, nameParam, standardizedName);
        else return wordsStandardize(country.country) === standardizedName;
    });
}

function search(country, nameParam, standardizedName) {
    return ((country.countryInfo || {}).iso3 || '').toLowerCase() === nameParam.toLowerCase()
    || ((country.countryInfo || {}).iso2 || '').toLowerCase() === nameParam.toLowerCase()
    || wordsStandardize(country['country']).includes(standardizedName);
}