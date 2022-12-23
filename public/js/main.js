// import mongoConnect from "../..";

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
    // Use some dummy data first
    const imageName = searchedImage.name;
    const imageUrl = searchedImage.url;
    handleSaveImage(imageName, imageUrl);
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

const handleSaveImage = async (name, url) => {
    try {
        showSpinner();

        const response = await fetch('/openai/saveimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                name,
                url
            })
        });

        if (response.statusCode !== 201) {
            hideSpinner();
            resetResult();
            throw new Error('Error saving image. Please try again');
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