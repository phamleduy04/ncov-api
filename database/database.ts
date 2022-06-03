import { MongoClient } from 'mongodb';
import { Collection } from './collection';
import 'dotenv/config';
import { info } from '../utils/log';


const mongo: MongoClient = new MongoClient(process.env.MONGODB || "mongodb://localhost/economy");
mongo.connect().then(() => info("Connected to MongoDB"));

const mongoCollection = mongo.db().collection('ncov');
const db = new Collection(mongoCollection, mongo.startSession());


const get = async (key: string) => {
    if (!key) throw new Error('No key provided');
    return await db.get(key);
};

const set = async (key: string, value: any) => {
    if (!key || !value) throw new Error('Key or value is null!');
    return await db.set(key, value);
};

const getAll = async () => {
    return await db.all();
};

const reset = async () => {
    return await db.drop();
};

const close = async () => {
    return await mongo.close();
};

export {
    get,
    set,
    getAll,
    reset,
    close,
};