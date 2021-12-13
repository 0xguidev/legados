const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_DB_URL = `mongodb://localhost:27017`;
const DB_NAME = 'Hacklathon';

let connection = null;

module.exports = async () => {
    try {
        connection = (connection || (await MongoClient.connect(MONGO_DB_URL, OPTIONS)).db(DB_NAME));
        return connection;
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
