import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseQueryExample {

    // Database connection details - adjust these for your database
    private static final String DB_URL = "jdbc:mysql://localhost:3306/your_database_name"; // e.g., "jdbc:mysql://localhost:3306/mydatabase"
    private static final String DB_USER = "your_username";  // e.g., "root"
    private static final String DB_PASSWORD = "your_password"; // e.g., "password"
    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver"; // Or "com.mysql.jdbc.Driver" for older versions

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // 1. Register JDBC driver (optional in modern JDBC, but good practice)
            Class.forName(JDBC_DRIVER);

            // 2. Open a connection to the database
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);

            // 3. Create a statement object for executing queries
            System.out.println("Creating statement...");
            stmt = conn.createStatement();

            // 4. Define and execute the SQL query
            String sql = "SELECT id, name, email FROM users WHERE 1=1"; // Example query - replace with your table and columns
            rs = stmt.executeQuery(sql);

            // 5. Process the result set
            System.out.println("Fetching results...");
            while (rs.next()) {
                // Retrieve data from each row by column name
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String email = rs.getString("email");

                // Display the retrieved data
                System.out.println("ID: " + id + ", Name: " + name + ", Email: " + email);
            }

            // 6. Clean up resources (close ResultSet, Statement, and Connection) - VERY IMPORTANT
            System.out.println("Closing resources...");
            if (rs != null) {
                rs.close();
            }
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
            System.out.println("Operation complete.");

        } catch (SQLException se) {
            // Handle SQL exceptions (e.g., database error, invalid query)
            System.err.println("SQLException: " + se.getMessage());
            System.err.println("SQLState: " + se.getSQLState());
            System.err.println("VendorError: " + se.getErrorCode());
        } catch (ClassNotFoundException cnfe) {
            // Handle ClassNotFoundException (if the JDBC driver class is not found)
            System.err.println("ClassNotFoundException: " + cnfe.getMessage());
        } finally {
            // Ensure resources are closed in a finally block to prevent leaks, even if exceptions occur
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException se2) {
                System.err.println("SQLException (closing resources): " + se2.getMessage());
            }
        }
    }
}
