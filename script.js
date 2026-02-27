const cors = require('cors');
app.use(cors());


async function uploadImage() {
    const fileInput = document.querySelector('#image');
    const formData = new FormData();
    
    // "image" must match the name used in your Express middleware: upload.single('image')
    formData.append('image', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
            // DO NOT set the 'Content-Type' header; 
            // the browser sets it automatically with the correct boundary
        });

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}
