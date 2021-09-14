/**
 * Database ID: ncovcity
 * Interval: 10m
 */

const axios = require('axios');
const log = require('../utils/log');
const { set } = require('../handlers/database');

const processCityVN = async () => {
    try {
        // URL chính thức trong network requset từ web https://covid19.gov.vn/
        const url = `https://static.pipezero.com/covid/data.json`;
        const html = (await axios.default({ method: 'GET', url, httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) })).data;
        const res = html.locations.map(el => {
            return {
                updatedAt: Date.now(),
                dia_diem: el.name,
                tu_vong: el.death,
                hom_nay: el.casesToday,
                tong_ca_nhiem: el.cases,
            };
        });
        await set('ncovcity', res);
        log.info(`NCOVcity Scraper success! ${res.length} cities`);
        await set('nocvcity1week', html.overview);
        log.info(`NCOVcity Scraper success! ${html.overview.length} dates`);
    }
    catch (err) {
        log.err('NCOV-ALL failed!', err);
        return null;
    }
};

module.exports = processCityVN;