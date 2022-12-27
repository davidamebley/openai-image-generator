// import mongoConnect from "../..";

// Some Globals
const searchedImage = {
    name: '',
    url: '',
};

let isImageSaved = false;

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
    // image data
    if (!isImageSaved){
        const imageName = searchedImage.name;
        const imageUrl = searchedImage.url;
        handleSaveImage(imageName, imageUrl);
    }
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
        showSaveButton();

    } catch (error) {
        document.querySelector('.msg').innerHTML = error;
    }
}

const handleSaveImage = async (name, url) => {
    try {
        removeSaveMessage();
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
        
        hideSpinner();

        if (!response.ok) {
            console.log('Acknowledged..:', response);
            hideSpinner();
            removeSaveMessage();
            throw new Error('Error saving image. Please try again');
        }

        //Disable button
        disableSaveButton();
        showSaveSuccess();

    } catch (error) {
        hideSpinner();
        document.querySelector('.save-msg').innerHTML = error;
    }
}

const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show-spinner')
}

const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove('show-spinner')
}

const resetResult = () => {
    isImageSaved = false
    document.querySelector('.msg').innerHTML = '';
    document.querySelector('.msg').textContent = '';
    document.querySelector('.save-msg').innerHTML = '';
    document.querySelector('.save-msg').textContent = '';
    document.querySelector('#image').src = '';
    document.querySelector('#image').innerHTML = '';
    document.getElementById("save-image").style.display = "none";
    document.getElementById('save-image').className = 'btn'
    document.getElementById('save-image').innerHTML = 'Save to Previous Searches'
}
const removeSaveMessage = () => {
    document.querySelector('.save-msg').innerHTML = '';
    document.querySelector('.save-msg').textContent = '';
}
const showSaveSuccess = () => {
    document.querySelector('.save-msg').innerHTML = 'Data saved successfully';
}
const disableSaveButton = () => {
    isImageSaved = true;
    document.getElementById('save-image').className = 'disabled-button'
    document.getElementById('save-image').innerHTML = 'Image saved'
    // document.getElementById('save-image').style.backgroundColor = 'blue';
}
const showSaveButton = () => {
    document.getElementById('save-image').style.display = 'block';
    document.getElementById('save-image').disabled = false;
}

// Trigger Events
document.querySelector('#image-form').addEventListener('submit', onSubmit);
document.querySelector('#save-image').addEventListener('click', onSaveImage);