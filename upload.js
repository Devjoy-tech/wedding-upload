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
        // Check if response is OK (status 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse response body as JSON
        return response.json();
    })
    .then(data => {
        // Data is the parsed JSON object
        console.log(data);
        // You can further process the data here
    })
    .catch(error => {
        console.error('Fetch error:', error);
        // Handle errors here
    });
    } else {
        console.error('No file selected');
    }
}
