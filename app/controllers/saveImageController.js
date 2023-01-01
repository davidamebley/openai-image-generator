const MongoClient = require('mongodb').MongoClient;

const saveImage = async (req, res) => {
    let response = res;
    let db = null;
    let something;
    let result;
    const DATABASE_NAME = 'openai';
    const dbCollection = 'images';

    MongoClient.connect(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PWD}@mongodb:27017`, function(err, client){
        if (err) throw err;
        
        try {
            
            console.log('Connected to Database Server');
            let db = client.db(DATABASE_NAME);
            //Avoid duplicate urls
            db.collection(dbCollection).createIndex({ "url": 1 }, { unique: true });
            //Insert data
            db.collection(dbCollection).insertOne({name: req.body.name, url:req.body.url, createdAt: new Date(), lastModified: new Date()}, function(err, result){
                if (err) throw err.message;
                console.log('Save successful');
                client.close();
                console.log('Result send..: ', result);
                response.send(result);
                console.log('Response:.. ', response)
                return result;
            });
        } catch (error) {
            console.log(error);
        }
    });
}

module.exports = {saveImage};