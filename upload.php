<?php
$databaseFile = 'foto_directory.db';
$createTableQuery = "CREATE TABLE IF NOT EXISTS foto_table (
  id INTEGER PRIMARY KEY,
  name TEXT,
  date TEXT
)";
$insertQuery = "INSERT INTO foto_table (name, date) VALUES (:name, :date)";

try {
    // Check if the database file exists
    if (!file_exists($databaseFile)) {
        // Create a new SQLite3 database object
        $database = new SQLite3($databaseFile);

        // Check if the database was created successfully
        if ($database->lastErrorCode() == 0) {
            // Execute the table creation query
            $result = $database->exec($createTableQuery);

            // Check if the table was created successfully
            if ($result !== false) {
                // echo "Table created successfully!<br>";
            } else {
                throw new Exception("Error creating table: " . $database->lastErrorMsg());
            }
        } else {
            throw new Exception("Error creating database: " . $database->lastErrorMsg());
        }
    }

    // Check if a file was uploaded
    if (isset($_FILES["fileToUpload"])) {
        $temp = explode(".", $_FILES["fileToUpload"]["name"]);
        $target_dir = "uploads/";
        // $xtarget_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        // $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        // $target_file = $target_dir . round(microtime(true)) . '.' . end($temp);
        $generated_name = round(microtime(true)) . '.' . end($temp);
        $target_file = $target_dir . $generated_name;
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Check if image file is a actual image
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            throw new Exception("File is not an image.");
        }

        // Check if file already exists
        if (file_exists($target_file)) {
            throw new Exception("Sorry, file already exists.");
        }

        // Check file size
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            throw new Exception("Sorry, your file is too large.");
        }

        // Allow certain file formats
        if (!in_array($imageFileType, array("jpg", "png", "jpeg", "gif"))) {
            throw new Exception("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            throw new Exception("Sorry, your file was not uploaded.");
        } else {
            // Try to move the uploaded file to the target directory
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                // Open the database connection
                $database = new SQLite3($databaseFile);
                // Prepare the insert statement
                $statement = $database->prepare($insertQuery);
                // Bind parameters
                // $name = basename($_FILES["fileToUpload"]["name"]);
                $name = $generated_name;
                $date = date('Y-m-d H:i:s');
                $statement->bindParam(':name', $name);
                $statement->bindParam(':date', $date);
                // Execute the insert statement
                $result = $statement->execute();
                if ($result !== false) {
                    // echo json_encode("The file ". htmlspecialchars($name). " has been uploaded.");
                    echo json_encode("The file has been uploaded.");
                } else {
                    throw new Exception("Error inserting data: " . $database->lastErrorMsg());
                }
                // Close the database connection
                $database->close();
            } else {
                throw new Exception("Sorry, there was an error uploading your file.");
            }
        }
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
?>
