import { request } from 'undici';
import * as log from '../utils/log';
import { set } from '../database';

const processCityVn = async () => {
    // URL chính thức trong network requset từ web https://covid19.gov.vn/
    const url = `https://static.pipezero.com/covid/data.json`;
    const response = await request(url).then(res => res.body.json());
    const todayResponse:Array<cityVNToday> = response.locations;
    const oneWeekResponse:Array<cityVNOneWeek> = response.overview;

    await set('ncovcity', todayResponse);
    log.info(`NCOVcity Scraper success! ${todayResponse.length} cities`);
    await set('ncovcity1week', oneWeekResponse);
    log.info(`NCOVcity Scraper success! ${oneWeekResponse.length} cities`);
};

export default processCityVn;

export interface cityVNToday {
    name: string,
    death: number,
    treating: number,
    cases: number,
    recovered: number,
    casesToday: number,
};

export interface cityVNOneWeek {
    date: string,
    death: number,
    treating: number,
    cases: number,
    recovered: number,
    avgCases7day: number,
    avgRecovered7day: number,
    avgDeath7day: number,
};