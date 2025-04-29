using System;
using System.Data.SqlClient; // For SQL Server - adjust for other databases
using System.Data;

namespace DatabaseQueryExample
{
    class Program
    {
        // Database connection string - adjust for your database
        private static readonly string DB_CONNECTION_STRING = "Server=localhost;Database=your_database_name;User Id=your_username;Password=your_password;"; // Example for SQL Server

        static void Main(string[] args)
        {
            // Declare variables for database objects
            SqlConnection conn = null;
            SqlCommand cmd = null;
            SqlDataReader reader = null;

            try
            {
                // 1. Create a new SqlConnection object
                Console.WriteLine("Connecting to database...");
                conn = new SqlConnection(DB_CONNECTION_STRING);

                // 2. Open the database connection
                conn.Open();

                // 3. Create a new SqlCommand object
                Console.WriteLine("Creating command...");
                cmd = new SqlCommand();
                cmd.Connection = conn; // Set the connection for the command

                // 4. Define the SQL query
                string sql = "SELECT id, name, email FROM users"; // Example query - replace with your table and columns
                cmd.CommandText = sql;  // Set the SQL query text

                // 5. Execute the query and get a SqlDataReader
                Console.WriteLine("Executing query...");
                reader = cmd.ExecuteReader();

                // 6. Process the results
                Console.WriteLine("Fetching results...");
                while (reader.Read())
                {
                    // Retrieve data from each row by column name or index
                    int id = reader.GetInt32(reader.GetOrdinal("id")); // Use GetOrdinal for efficiency if column names are used repeatedly
                    string name = reader.GetString(reader.GetOrdinal("name"));
                    string email = reader.GetString(reader.GetOrdinal("email"));

                    // Display the retrieved data
                    Console.WriteLine($"ID: {id}, Name: {name}, Email: {email}");
                }

                // 7. Clean up resources (close the reader, command, and connection) - VERY IMPORTANT
                Console.WriteLine("Closing resources...");
                if (reader != null)
                    reader.Close();
                if (cmd != null)
                    cmd.Dispose(); //  Use Dispose() for SqlCommand
                if (conn != null)
                    conn.Close();
                Console.WriteLine("Operation complete.");
            }
            catch (SqlException ex)
            {
                // Handle SQL exceptions
                Console.Error.WriteLine("SqlException: " + ex.Message);
                Console.Error.WriteLine("SQL Error Code: " + ex.ErrorCode);
                Console.Error.WriteLine("SQL State: " + ex.State);
            }
            catch (Exception ex)
            {
                // Handle other exceptions
                Console.Error.WriteLine("Exception: " + ex.Message);
            }
            finally
            {
                // Ensure resources are closed in a finally block to prevent leaks
                try
                {
                    if (reader != null)
                        reader.Close();
                    if (cmd != null)
                        cmd.Dispose();
                    if (conn != null)
                        conn.Close();
                }
                catch (SqlException ex2)
                {
                    Console.Error.WriteLine("Exception closing resources: " + ex2.Message);
                }
            }
            //Console.ReadKey(); // Keep the console window open (optional - for debugging)
        }
    }
}
