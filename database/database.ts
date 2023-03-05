import * as Keyv from 'keyv';
import 'dotenv/config';
import { error } from '../utils/log';

const db = new Keyv(process.env.DBURL || undefined);
db.on('error', err => error('Connection Error', err));

const get = async (key: string) => {
    if (!key) throw new Error('No key provided');
    return await db.get(key);
};

const set = async (key: string, value: any) => {
    if (!key || !value) throw new Error('Key or value is null!');
    return await db.set(key, value);
};

export {
    get,
    set,
};