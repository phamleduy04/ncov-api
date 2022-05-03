import { Injectable, BadRequestException } from '@nestjs/common';
import { get } from '../../../database/database';
import { getCountryData, wordsStandardize } from '../../../utils/utils';
import type { WOMWorldData } from '../../../scrapers/wom.world';
import type { WOMUsState } from '../../../scrapers/wom.usstate';

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

    async getAllCountries(yesterday:Boolean = false): Promise<WOMWorldData[]> {
        const data:WOMWorldData[] = (await get(yesterday ? 'womYesterday' : 'womToday')).filter(elem => elem.country.toLowerCase() !== 'world').map(fixApostrophe).map(el => el);
        return data;
    };

    async getCountryName(yesterday:Boolean = false, query:string): Promise<WOMWorldData> {
        const data:WOMWorldData[] = (await get(yesterday ? 'womYesterday' : 'womToday')).filter(elem => elem.country.toLowerCase() !== 'world').map(fixApostrophe).map(el => el);
        const countryData = getCountryWOHData(data, query) || null;
        return countryData;
    }

    async getAllUSSates(yesterday:Boolean = false): Promise<WOMUsState[]> {
        const data:WOMUsState[] = (await get(yesterday ? 'USYesterday' : 'USToday'));
        return data;
    };

    async getUSState(yesterday:Boolean = false, query:string): Promise<WOMUsState> {
        const data:WOMUsState[] = (await get(yesterday ? 'USYesterday' : 'USToday'));
        const stateData = data.find(el => el.state.toLowerCase() === query.toLowerCase());
        if (!stateData) throw new BadRequestException('Not found');
        return stateData;
    }
}

function fixApostrophe(country) {
    country.country = country.country.replace(/"/g, '\'');
	return country;
}

function getCountryWOHData(data, nameParam) {
    const countryInfo = isNaN(nameParam) ? getCountryData(nameParam) : { country: null };
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