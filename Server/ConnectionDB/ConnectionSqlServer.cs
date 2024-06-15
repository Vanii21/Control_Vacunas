using System.Data.SqlClient;

namespace Server.ConnectionDB
{
    public class ConnectionSqlServer
    {
        public static SqlConnection Connection(IConfiguration configuration)
        {
            SqlConnection cnn = new SqlConnection(configuration.GetConnectionString("MainConnection"));
            cnn.Open();
            return cnn;
        }
    }
}
