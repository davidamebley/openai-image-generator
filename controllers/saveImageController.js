const MongoClient = require('mongodb').MongoClient;

const saveImage = async (req, res) => {
    // alert(searchedImage.name + '\n' + searchedImage.url);
    const imgObj = {
        name: req.name,
        url: req.url,
    }

    const uri = 'mongodb://admin:password@localhost:27017';

    try {

        // const client = await MongoClient.connect(uri,{ useNewUrlParser: true });
        const client = await mongoConnect();
        
        const db = client.db('openai-image-generator');

        db().collection('saved-images');
        await client.insertOne(
            {
                name: 'spot',
                kind: 'dog'
            },
            (err, result) => {
                if (err) throw err;
                console.log('Save result..: ', result);
                client.close();
            }
        );
    
      } catch(e) {
        console.error(e)
      }

}

module.exports = {saveImage};