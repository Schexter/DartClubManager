import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestDB {
    public static void main(String[] args) {
        String[] urls = {
            "jdbc:postgresql://127.0.0.1:5432/dartclub",
            "jdbc:postgresql://localhost:5432/dartclub",
            "jdbc:postgresql://172.19.43.117:5432/dartclub"
        };

        String username = "dartclub";
        String password = "dartclub_dev_password";

        for (String url : urls) {
            System.out.println("Testing: " + url);
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                System.out.println("✅ SUCCESS: " + url);
                break;
            } catch (SQLException e) {
                System.out.println("❌ FAILED: " + url + " - " + e.getMessage());
            }
        }
    }
}