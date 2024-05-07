function fetchPhotoList() {
    fetch('photos.php')
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        if (data.length > 0) {
            const gridContainer = document.getElementById('grid-container');
            gridContainer.innerHTML = '';
            data.forEach(photo => {
                console.log(photo);
                const img = document.createElement('img');
                img.src = 'uploads/' + photo.name;
                img.alt = photo.name;

                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-items');
                gridItem.appendChild(img);
                gridContainer.appendChild(gridItem);
            });
        } else {
            console.error('Error: Invalid response from server');
        }
    })
    .catch(error => {
        console.error('Error fetching photo list:', error);
    });
}

window.onload = fetchPhotoList;