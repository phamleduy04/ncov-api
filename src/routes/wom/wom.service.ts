import { Injectable } from '@nestjs/common';
import { get } from '../../../database/database';

@Injectable()
export class womService {
    getHello(): string {
        return 'Hello World!';
    }

    async getWorldData(yesterday:Boolean = false): Promise<Object> {
        const countries = await get(yesterday ? 'womYesterday' : 'womToday');
        const worldData = countries.find(elem => elem.country.toLowerCase() === 'world');
        worldData.affectedCountries = countries.length - 1;
        const { country, countryInfo, ...cleanedWorldData } = worldData;
        return cleanedWorldData;
    }

    async getAllCountries(yesterday:Boolean = false): Promise<Object> {
        const data:Object = (await get(yesterday ? 'womYesterday' : 'womToday')).filter(elem => elem.country.toLowerCase() !== 'world').map(fixApostrophe).map(el => el);
        return data;
    };
}

function fixApostrophe(country) {
    country.country = country.country.replace(/"/g, '\'');
	return country;
}

// function getWOHData(data, nameParam) {
//     const countryInfo = isNaN(nameParam) ? getCountryData(nameParam) : {};
//     const standardizedName = wordsStandardize(countryInfo.country ? countryInfo.country : nameParam);
//     return data.find((country) => {
//         if (!isNaN(nameParam)) return country.countryInfo && country.countryInfo._id === Number(nameParam);
//         if (country.continent && country.continent.includes('-')) return search(country, nameParam, standardizedName);
//         else return wordsStandardize(country.country) === standardizedName;
//     });
// }

// function search(country, nameParam, standardizedName) {
//     return ((country.countryInfo || {}).iso3 || '').toLowerCase() === nameParam.toLowerCase()
//     || ((country.countryInfo || {}).iso2 || '').toLowerCase() === nameParam.toLowerCase()
//     || wordsStandardize(country['country']).includes(standardizedName);
// }