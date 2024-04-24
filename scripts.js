// JavaScript for image upload modal and handling image upload

document.addEventListener("DOMContentLoaded", function() {
    // Get the modal
    var modal = document.getElementById("uploadModal");

    // Get the button that opens the modal
    var uploadBtn = document.getElementById("uploadButton");

    // Get the <span> element that closes the modal
    var closeBtn = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    uploadBtn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Image upload functionality
    var imageInput = document.getElementById("imageInput");
    var submitBtn = document.getElementById("submitImage");

    submitBtn.addEventListener("click", function() {
        var file = imageInput.files[0];
        if (file) {
            uploadImage(file);
        } else {
            alert("Please select an image.");
        }
    });

    function uploadImage(file) {
        // Add logic to upload the image to the server
        // You can use AJAX, Fetch API, or a form submission
        // Example:
        // var formData = new FormData();
        // formData.append("image", file);
        // fetch("upload.php", {
        //     method: "POST",
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert("Image uploaded successfully!");
        //     modal.style.display = "none";
        // })
        // .catch(error => {
        //     console.error("Error uploading image:", error);
        // });
    }
});
