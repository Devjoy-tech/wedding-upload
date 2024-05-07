// JavaScript for displaying the image gallery

document.addEventListener("DOMContentLoaded", function() {
    var gallery = document.getElementById("gallery");
    var loadMoreBtn = document.getElementById("loadMore");

    loadImages();

    function loadImages() {
        // Add logic to fetch images from the server
        // Example:
        // fetch("get_images.php")
        // .then(response => response.json())
        // .then(data => {
        //     data.forEach(image => {
        //         var imgElement = document.createElement("img");
        //         imgElement.src = image.url;
        //         gallery.appendChild(imgElement);
        //     });
        // })
        // .catch(error => {
        //     console.error("Error loading images:", error);
        // });
    }

    loadMoreBtn.addEventListener("click", function() {
        // Add logic to load more images
    });
});
