import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class TestConnection {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5433/dartclub";
        String user = "dartclub_user";
        String password = "postgres";

        try {
            Class.forName("org.postgresql.Driver");
            System.out.println("Driver loaded successfully");

            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("Connection successful!");

            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT current_user, current_database()");

            if (rs.next()) {
                System.out.println("Current user: " + rs.getString(1));
                System.out.println("Current database: " + rs.getString(2));
            }

            rs.close();
            stmt.close();
            conn.close();
            System.out.println("Test completed successfully!");

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
