const MongoClient = require('mongodb').MongoClient;

const saveImage = async (req, res) => {
    let response = res;
    let db = null;
    let something;
    let result;
    const DATABASE_NAME = 'openai';
    const dbCollection = 'images';
    const { imageName, imageUrl } = req.body;

    const uri = 'mongodb://admin:password@127.0.0.1:27017/`';
    // const uri = `mongodb://${encodeURIComponent('davidamebley')}:${encodeURIComponent('password')}@localhost:27017/${encodeURIComponent(DATABASE_NAME)}?authSource=admin`;
    // const uri = `mongodb://127.0.0.1:27017/${DATABASE_NAME}`;

    MongoClient.connect('mongodb://davidamebley:password@localhost:27017', function(err, client){
        if (err) throw err;
        console.log('Connected to Database Server');
        let db = client.db('openai');
        let query = { userid: 1 };
        db.collection('images').insertOne({name: 'Trying', url: 'someurl'}, function(err, result){
            if (err) throw err;
            console.log('Save successful');
            client.close();
            response.send(result);
            // console.log('Response:.. ', response)
        });
    });

    // Testing Some code
    const client = new MongoClient(uri, {useNewUrlParser:true});

        /* try {
            await client.connect();
            db = client.db(DATABASE_NAME);

            console.log('Successfully connected to OpenAIImageGen DB');
            something = await db.collection(dbCollection).countDocuments();
            console.log('Our result: ', something)
            result = await db.collection(dbCollection).insertOne({name: 'Trying', url: 'someurl'});
            console.log('Insert successful', result);
            client.close();
            return result;
        } catch (error) {
            console.log('MongoClient Error log:.. ',error);
        } */

        

        /* db.collection('saved-images').insertOne({name: 'Trying', url: 'someurl'}, function (err, res){
            if (err) throw err;
            console.log('Successfully inserted new data');
            client.close();
            response.send('Save successful');
        }); */
    // });

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