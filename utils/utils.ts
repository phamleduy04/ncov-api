import * as countryData from '../assets/countries.json';

const wordsStandardize = (word:string):string => word ? word.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';

const getCountryData = (country:string):country => {
    const countryName = wordsStandardize(country);
    const nullReturn = { _id: null, country: null, iso2: null, iso3: null, lat: 0, long: 0 };
    const countryFound = countryData.find(item => (wordsStandardize(item.country) === countryName || wordsStandardize(item.iso2) === countryName || wordsStandardize(item.iso3) === countryName || item.id === parseInt(countryName)) || !!(item.possibleNames ? item.possibleNames : []).find(synonym => wordsStandardize(synonym) === countryName));
    return countryFound ? {
        _id: countryFound.id,
        country: countryFound.country,
        iso2: countryFound.iso2,
        iso3: countryFound.iso3,
        lat: countryFound.lat,
        long: countryFound.long,
    } : nullReturn;
};


export {
    getCountryData,
    wordsStandardize,
}

export interface country {
    _id: number;
    country: string;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
}