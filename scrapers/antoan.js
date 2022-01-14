/**
 * Database ID: antoanvn
 * Interval: 10m
 */

const axios = require('axios');
const cheerio = require('cheerio').default;
const log = require('../utils/log');
const { set } = require('../handlers/database');
const columns = ['STT', 'dia_diem', 'an_toan', 'co_rui_ro', 'khong_an_toan', 'chua_danh_gia', 'ty_le_an_toan', 'muc_do_an_toan'];

const mapRows = (_, row) => {
    const city = { updatedAt: Date.now() };
    cheerio(row).children('td').each((index, cell) => {
        cell = cheerio.load(cell);
        switch (index) {
            case 0:
            case 8:
                break;
            case 1:
            case 7:
            case 6:
                city[columns[index]] = cell.text().trim() || null;
                break;
            default:
                city[columns[index]] = parseInt(cell.text().trim()) || null;
                break;
        }
    });
    return city;
};

const processAnToanVN = async () => {
    return;
    const { data } = await axios.get('https://antoancovid.vn/dashboard_2');
    const $ = cheerio.load(data);
    const res = $('table#exampleAntoancovidAll').children('tbody:first-of-type').children('tr').map(mapRows).get();
    await set('antoanvn', res);
    log.info(`antoanVN scraper success!`);
};

module.exports = processAnToanVN;