const countryData = require('../assets/countries.json');

// Returns a standardized version of the word
const wordsStandardize = (word) => word ? word.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';


// Gets all country data given a name
 const getCountryData = (countryNameParam) => {
	const countryName = module.exports.wordsStandardize(countryNameParam);
	const nullReturn = { _id: null, country: null, iso2: null, iso3: null, lat: 0, long: 0 };
	const countryFound = countryData.find(item => (module.exports.wordsStandardize(item.country) === countryName || module.exports.wordsStandardize(item.iso2) === countryName || module.exports.wordsStandardize(item.iso3) === countryName || item.id === parseInt(countryName)) || !!(item.possibleNames ? item.possibleNames : []).find(synonym => module.exports.wordsStandardize(synonym) === countryName));

	return countryFound ? {
		_id: countryFound.id,
		country: countryFound.country,
		iso2: countryFound.iso2,
		iso3: countryFound.iso3,
		lat: countryFound.lat,
		long: countryFound.long,
	} : nullReturn;
};

module.exports = {
    getCountryData,
    wordsStandardize,
};