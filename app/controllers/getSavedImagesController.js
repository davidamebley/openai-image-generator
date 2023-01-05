const MongoClient = require('mongodb').MongoClient;

let myImages;

const getImages = async (req, res) => {
    let response = res;
    const DATABASE_NAME = 'openai';
    const dbCollection = 'images';

    MongoClient.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@localhost:27017`, function(err, client){
        if (err) throw err;
        
        try {
            
            console.log('Connected to Database Server');
            let db = client.db(DATABASE_NAME);
            //Get data. projection includes (1)/excludes(0) some fields
            db.collection(dbCollection).find({}, {projection: {_id: 0, name: 1, url: 1, createdAt: 1}}).toArray(async function(err, result) {
                if (err) throw err;
                console.log('Returned documents: ',result);
                client.close();
                
                myImages = 352352;
            });

        } catch (error) {
            console.log(error);
        }
    });
}

const sendImages = async () => {
    return myImages
}

module.exports = {getImages, myImages, sendImages};