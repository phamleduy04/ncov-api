/**
 * Database ID: ncov
 * Interval: 5h
 */

const axios = require('axios');
const cheerio = require('cheerio');
const log = require('../utils/log');
const columns = ['id', 'tuoi', 'dia_diem', 'tinh_trang', 'quoc_tich'];
const { set } = require('../handlers/database');
const mapRows = (_, row) => {
	const city = { updatedAt: Date.now() };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
            case 0:
                city[columns[index]] = parseInt(cell.text().replace('BN', ''));
                break;
            case 1:
                city[columns[index]] = cell.text() && cell.text() != '0' ? parseInt(cell.text()) : null;
                break;
            default:
				city[columns[index]] = cell.text();
				break;
		}
	});
	return city;
};


/**
 * Scrapes Vietnam government site and fills array of data from table
 */
let arr = [];
let i = 0;
const vietnamData = async () => {
    while (true) {
        try {
            i++;
            const url = `https://ncov.moh.gov.vn/vi/web/guest/trang-chu?p_p_id=corona_trangchu_top_CoronaTrangchuTopPortlet_INSTANCE_RrVAbIFIPL7v&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_corona_trangchu_top_CoronaTrangchuTopPortlet_INSTANCE_RrVAbIFIPL7v_delta=500&_corona_trangchu_top_CoronaTrangchuTopPortlet_INSTANCE_RrVAbIFIPL7v_resetCur=false&_corona_trangchu_top_CoronaTrangchuTopPortlet_INSTANCE_RrVAbIFIPL7v_cur=${i}`;
            const html = cheerio.load((await axios.default({ method: 'GET', url, httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) })).data);
            const res = html('table#sailorTable').children('tbody:first-of-type').children('tr').map(mapRows).get().filter(el => Object.keys(el).length !== 0);
            await arr.push(res);
            await log.info(`Đã lấy xong trang ${i} với ${res.length} bệnh nhân`);
            if (res.filter(el => el.id == '1').length != 0 || i > 500) break;
        } catch (err) {
            log.err('NCOV-ALL failed!', err);
            return null;
        }
    }
    arr = [].concat.apply([], arr).filter(el => el.id).sort((a, b) => b.id - a.id);
    arr = [...new Map(arr.map(item => [item.id, item])).values()];
    await set('ncov', arr);
    log.info(`NCOV-ALL SUCCESS! ${arr.length} cases`);
    // reset cho lần loop sau
    arr = [];
    i = 0;
};

module.exports = vietnamData;