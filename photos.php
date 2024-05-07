<?php
$databaseFile = 'foto_directory.db';

try {
    // Create a new SQLite3 database object
    $database = new SQLite3($databaseFile);

    // Check if the database file was just created
    if ($database->lastErrorCode() != 0) {
        throw new Exception("Error creating/accessing database: " . $database->lastErrorMsg());
    }

    // SELECT query to fetch all photos
    $selectQuery = "SELECT * FROM foto_table";

    // Execute the SELECT query
    $result = $database->query($selectQuery);

    // Check if the query was executed successfully
    if ($result !== false) {
        // Fetch the results as an associative array
        $photos = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $photos[] = $row;
        }
        // Output the photos array (you can process this array further as needed)
        echo json_encode($photos);
    } else {
        throw new Exception("Error executing SELECT query: " . $database->lastErrorMsg());
    }

    // Close the database connection
    $database->close();
} catch (Exception $e) {
    // Handle any exceptions that occur during the process
    echo "Error: " . $e->getMessage();
}
?>
