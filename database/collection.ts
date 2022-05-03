import type { Collection as MongoCollection, ClientSession } from 'mongodb';

export class Collection {

    constructor(public collection:MongoCollection, public session:ClientSession) {
        this.collection = collection;
        this.session = session;
    }
    /**
     * Returns if the collection has data with the specified key.
     * @param {string} key The key
     * @returns {Promise<boolean>}
     */
    async has(key:string):Promise<boolean> {
        if (!key) throw new Error('Key is required');
        try {
            const data = (await this.collection.findOne({ ID: key })) || {};
            return typeof data !== 'undefined';
        } catch {
            return false;
        }
    };

    /**
     * Get data from the collection
     * @param {string} key The key
     * @returns {Promise<any>}
     */
    async get(key:string):Promise<any> {
        if (!key) throw new Error('Key is required');
        const { data } = (await this.collection.findOne({ ID: key })) || { data: null };
        return data;
    }

    /**
     * Set data to the collection
     * @param {string} key The key
     * @param {any} data The data to save
     * @returns {Promise<any>}
     */
    async set(key:string, value:any):Promise<any> {
        if (!key) throw new Error('Key is required');
        if (value === undefined || value === null) throw new Error('Value is required');
        const data = await this.collection.updateOne({ ID: key }, { $set: { data: value } }, { upsert: true });
        if (data.modifiedCount > 0 || data.upsertedCount > 0) return data;
    }

    /**
     * Delete data from the collection
     * @param {string} key The key
     * @returns {Promise<Boolean>}
     */
    async delete(key:string):Promise<boolean> {
        if (!key) throw new Error("Key is required");
        const data = await this.collection.deleteOne({ ID: key });
        if (data.deletedCount > 0) return true;
        else return false;
    }


    /**
     * Drop the collection
     * @returns {Promise<Boolean>}
     */
    async drop():Promise<boolean> {
        try {
            return await this.collection.drop();
        } catch {
            return false;
        }
    }

    /**
     * Get all data from the collection
     * @returns {Promise<any[]>}
     */
    async all():Promise<any[]> {
        return await this.collection.find({}, { session: this.session }).toArray();
    }
}