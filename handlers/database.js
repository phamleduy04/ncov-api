require('dotenv').config();
const { Database } = require("quickmongo");
const db = new Database(process.env.MONGODB || 'mongodb://localhost/ncov-api');
db.connect().then(() => console.log('Database is ready!'));

module.exports = {
    get: async function(key) {
        if (!key) throw new Error('Key is null!');
        return await db.get(key);
    },
    set: async function(key, value) {
        if (!key || !value) throw new Error('Key or value is null!');
        return await db.set(key, value);
    },
    getAll: async function() {
        return await db.all();
    },
    reset: async function() {
        return await db.drop();
    },
};