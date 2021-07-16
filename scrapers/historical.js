/**
 * DatabaseID: historical
 * Interval: 30m
 */
const axios = require('axios');
const csv2json = require('csvtojson');
const { set } = require('../handlers/database');
const log = require('../utils/log');
const columns = require('../assets/historicalColumns.json');
const url = "https://vnexpress.net/microservice/sheet/type/covid19_2021_by_day";

const extractData = (loc) => {
    const obj = {};
    const arr = Object.keys(loc);
    columns.map((_, index) => {
        const selector = columns[index];
        switch(index) {
            case 44:
                break;
            case 0:
            case 25:
            case 38:
            case 39:
            case 40:
            case 42:
            case 45:
                obj[selector] = loc[arr[index]].length == 0 ? null : loc[arr[index]];
                break;
            default:
                obj[selector] = parseInt(loc[arr[index]]) || null;
                break;
        }
    });
    return obj;
};

const historicalData = async () => {
    try {
        const res = await axios.get(url);
        const parsed = await csv2json({ noheader: false })
            .fromString(res.data);
        const extracted = parsed.map(extractData).filter(el => el.cong_dong);
        await set('historical', extracted);
        log.info(`Updated Historical: ${extracted.length}`);
    }
    catch(error) {
        log.err('Historical scraping failed!', error);
    }
};

module.exports = historicalData;
