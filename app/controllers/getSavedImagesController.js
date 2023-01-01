const MongoClient = require('mongodb').MongoClient;

const getImages = async (req, res) => {
    let response = res;
    const DATABASE_NAME = 'openai';
    const dbCollection = 'images';

    MongoClient.connect(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PWD}@mongodb:27017`, function(err, client){
        if (err) throw err;
        
        try {
            
            console.log('Connected to Database Server');
            let db = client.db(DATABASE_NAME);
            //Get data. projection includes (1)/excludes(0) some fields
            db.collection(dbCollection).find({}, {projection: {_id: 0, name: 1, url: 1, createdAt: 1}}).toArray(function(err, result) {
                if (err) throw err;
                console.log('Returned documents: ',result);
                client.close();
            });

        } catch (error) {
            console.log(error);
        }
    });
}

module.exports = {getImages,};