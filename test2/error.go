package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql" // Import the MySQL driver (or replace with your database driver)
)

func main() {
	// 1. Database connection details - adjust these for your database
	dbURL := "your_username:your_password@tcp(localhost:3306)/your_database_name" // e.g., "root:password@tcp(localhost:3306)/mydatabase"
	// The general format is:  username:password@protocol(host:port)/database_name
	//  For other databases (PostgreSQL, etc.), the URL format will be different.  See the driver's documentation.

	// 2. Open a connection to the database
	fmt.Println("Connecting to database...")
	db, err := sql.Open("mysql", dbURL) // Replace "mysql" with "postgres", "sqlite3", etc., for other databases
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	defer db.Close() // Ensure the connection is closed when the function finishes

	// 3. Check if the connection is healthy
	err = db.Ping()
	if err != nil {
		log.Fatalf("Error pinging database: %v", err)
	}
	fmt.Println("Successfully connected!")

	// 4. Define and execute the SQL query
	sqlQuery := "SELECT id, name, email FROM users WHERE id='xpto'" // Example query - replace with your table and columns
	rows, err := db.Query(sqlQuery)
	if err != nil {
		log.Fatalf("Error executing query: %v", err)
	}
	defer rows.Close() // Ensure the rows are closed after we're done with them

	// 5. Process the results
	fmt.Println("Fetching results...")
	for rows.Next() {
		var id int
		var name string
		var email string

		// Scan the values from the row into variables
		err = rows.Scan(&id, &name, &email)
		if err != nil {
			log.Fatalf("Error scanning row: %v", err)
		}

		// Display the retrieved data
		fmt.Printf("ID: %d, Name: %s, Email: %s\n", id, name, email)
	}

	// 6. Check for any errors during row iteration
	err = rows.Err()
	if err != nil {
		log.Fatalf("Error during row iteration: %v", err)
	}

	fmt.Println("Operation complete.")
	os.Exit(0) // Explicitly exit, though main() exiting does this implicitly
}
