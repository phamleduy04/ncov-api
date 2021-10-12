require('dotenv').config();
const { Collection: MongoCollection, MongoClient } = require("mongodb");
const { Fields } = require("quickmongo");

const mongo = new MongoClient(process.env.MONGODB || 'mongodb://localhost/ncov-api');
const schema = new Fields.AnyField;

mongo.connect().then(() => console.log('Database is ready!'));

const db = new Collection(MongoCollection, schema);

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