using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;

namespace Server.Utilities
{
    public class DataProccess
    {
        public dynamic DataProcessValidate(SqlCommand cmd)
        {
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataSet setter = new DataSet();
            dynamic data;

            try
            {
                adapter.Fill(setter, "res");
                if (setter.Tables["res"] == null)
                {
                    data = new JObject();
                    data.message = "Sin Datos en la Busqueda";
                    data.value = 0;
                    return data;

                }
            }
            catch (Exception ex)
            {
                data = new JObject();
                data.message = "Error " + ex.Message;
                data.value = 0;
                return data;

            }

            return new JObject()
            {
                { "response", 1 },
                { "data", JsonConvert.DeserializeObject<JToken>(JsonConvert.SerializeObject(setter.Tables["res"])) },
                { "value", 1 },
                { "message", "Proceso realizado con éxito." }
            };
        }
    }
}
