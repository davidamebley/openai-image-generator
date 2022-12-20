const MongoClient = require('mongodb').MongoClient;

const saveImage = async (req, res) => {
    let response = res;
    const { imageName, imageUrl } = req.body;

    const uri = 'mongodb://admin:password@localhost:27017';

    // Testing Some code
    MongoClient.connect('mongodb://admin:password@localhost:27017', {useNewUrlParser:true,useUnifiedTopology: true }, function (err, client){
        if (err) throw err;

        const db = client.db('openai-image-generator');

        console.log('Successfully connected to OpenAIImageGen DB');
        db.collection('saved-images').insertOne({name: 'Trying', url: 'someurl'}, function (err, res){
            if (err) throw err;
            console.log('Successfully inserted new data');
            client.close();
            response.send('Save successful');
        });
    });

    // --------End of Test. 

    /* try {

        const client = await MongoClient.connect(uri,{ useNewUrlParser: true });
        // const client = await mongoConnect();
        
        const db = client.db('openai-image-generator');

        db.collection('saved-images');
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
        res.status(201).json({
            success: true,
            message: "Image saved successfully"
        });
    
      } catch(e) {
        console.error(e)
      } */

}

module.exports = {saveImage};