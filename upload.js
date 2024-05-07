function uploadImage() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('fileToUpload', file);

        fetch('upload.php', {
            method: 'POST',
            body: formData
        })
        // .then(response => {
        //     console.log(response.json());
        //     if (response.ok) {
        //         console.log('Image uploaded successfully');
        //     } else {
        //         console.error('Failed to upload image');
        //     }
        // })
        // .catch(error => {
        //     console.error('Error uploading image:', error);
        // });

    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse response body as JSON
        return response.json();
    })
    .then(data => {
        // Data is the parsed JSON object
        console.log(data);
        // alert(data);
        if(data === 'The file has been uploaded.'){
            window.location.reload();
        } else{
            const erroMsg = document.getElementById('upload_message')
            erroMsg.innerHTML = data.error;
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert(error);
        // Handle errors here
    });
    } else {
        console.error('No file selected');
        alert('No file selected');
    }
}
