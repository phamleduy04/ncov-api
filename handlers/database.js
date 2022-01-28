const { MongoClient } = require("mongodb");
const { Collection } = require('./mongo');
require('dotenv').config();
const mongo = new MongoClient(process.env.MONGODB || "mongodb://localhost/economy");
mongo.connect().then(() => console.log("Connected to Mongodb database"));
const mongoCollection = mongo.db().collection("ncov");
const db = new Collection(mongoCollection, mongo.startSession());

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