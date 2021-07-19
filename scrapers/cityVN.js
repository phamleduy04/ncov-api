/**
 * Database ID: ncovcity
 * Interval: 2h
 */

const { set } = require('../handlers/database');
const log = require('../utils/log');
const processCityVN = async (ncovArr) => {
    try {
        const ref = {};
        const cityList = ncovArr.reduce((arr, cityObject) => {
            if (ref.hasOwnProperty(cityObject.dia_diem)) arr[ref[cityObject.dia_diem]].push(cityObject);
            else {
                ref[cityObject.dia_diem] = arr.length;
                arr.push([cityObject]);
            };
            return arr;
        }, []);

        const cityData = cityList.map((arr) => ({
            updatedAt: Date.now(),
            dia_diem: arr[0].dia_diem || "Chưa Xác Định",
            tong_ca_nhiem: arr.length,
            dang_dieu_tri: arr.filter(el => el.tinh_trang === 'Đang điều trị').length,
            khoi: arr.filter(el => el.tinh_trang === 'Khỏi').length,
            tu_vong: arr.filter(el => el.tinh_trang === 'Tử vong').length,
        }));

        await set('ncovcity', cityData);
        log.info(`NCOVcity SUCCESS! ${cityData.length} cities!`);
    } catch(err) {
        log.err('NCOVcity failed!', err);
        return null;
    };
};

module.exports = processCityVN;