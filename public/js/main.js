// import { mongoConnect } from "../..";
const mongoConnect = require('../../index.js');

// Some Globals
const searchedImage = {
    name: '',
    url: '',
};

const onSubmit = (e) => {
    e.preventDefault();

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('Please describe your image');
        return;
    }

    generateImageRequest(prompt, size);
};

const onSaveImage = () => {
    handleSaveImage();
};

const generateImageRequest = async (prompt, size) => {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });

        if (!response.ok) {
            hideSpinner();
            resetResult();
            throw new Error(`Your image could not be generated. Please make sure your description does not violate `+ `<a href="https://labs.openai.com/policies/content-policy" target="_blank">OPENAI\'s Content Policy </a>`);
        }

        resetResult();
        const data = await response.json();
        // console.log('generated image', data);

        const imageUrl = data.data;
        document.querySelector('#image').src = imageUrl;
        // Collecting Data for Saving
        searchedImage.url = imageUrl;
        searchedImage.name = prompt;

        hideSpinner();

        // Show Save Image Button
        document.getElementById('save-image').style.display = 'block';

    } catch (error) {
        document.querySelector('.msg').innerHTML = error;
    }
}

const handleSaveImage = async () => {
    // alert(searchedImage.name + '\n' + searchedImage.url);
    const imgObj = {
        name: searchedImage.name,
        url: searchedImage.url,
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

    //   Prev try catch
    /* try {

        const client = await MongoClient.connect(uri,{ useNewUrlParser: true });
        
        const db = client.db('openai-image-generator');

        client.db().collection('saved-images');
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
      } */
}

const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show-spinner')
}

const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove('show-spinner')
}

const resetResult = () => {
    document.querySelector('.msg').innerHTML = '';
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';
    document.querySelector('#image').innerHTML = '';
    document.getElementById("save-image").style.display = "none";
}

// Trigger Events
document.querySelector('#image-form').addEventListener('submit', onSubmit);
document.querySelector('#save-image').addEventListener('click', onSaveImage);