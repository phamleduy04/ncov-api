class Collection {
    constructor(collection, session) {
        this.collection = collection;
        this.session = session;
    }

    async has(key) {
        if (!key) throw new Error("Key is required");
        try {
            const { data } = (await this.collection.findOne({ ID: key })) || {};
            return typeof data !== "undefined";
        }
        catch {
            return false;
        }
    };

    async get(key) {
        if (!key) throw new Error("Key is required");
        const { data } = (await this.collection.findOne({ ID: key })) || {};
        return data;
    };

    async set(key, value) {
        if (!key) throw new Error("Key is required");
        if (value === undefined || value === null) throw new Error("Value is required");
        const data = await this.collection.updateOne({ ID: key }, { $set: { data: value } }, { upsert: true });
        if (data.modifiedCount > 0 || data.upsertedCount > 0) return data;
    };

    async delete(key) {
        if (!key) throw new Error("Key is required");
        const data = await this.collection.deleteOne({ ID: key });
        if (data.deletedCount > 0) return true;
        else return false;
    }

    async drop() {
        try {
            return await this.collection.drop();
        }
        catch {
            return false;
        }
    }

    async all() {
        return await this.collection.find({}, { session: this.session }).toArray();
    }
}

exports.Collection = Collection;