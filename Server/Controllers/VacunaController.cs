using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.ConnectionDB;
using Server.Models;
using Server.Utilities;
using System.Data.SqlClient;
using System.Data;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacunaController : ControllerBase
    {
        private readonly IConfiguration Configuration;
        private readonly string _connectionString;
        private readonly string _nameProcedure;

        DataProccess dataProccess;

        public VacunaController(IConfiguration configuration)
        {
            Configuration = configuration;
            _connectionString = Configuration.GetConnectionString("MainConnection");
            _nameProcedure = "pc_vacuna";
        }

        [HttpPost]
        [Route("add")]
        public IActionResult Add(VacunaModel obj)
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IDEmpleado", obj.IdEmpleado);
                        cmd.Parameters.AddWithValue("@IDTipoVacuna", obj.IdTipoVacuna);
                        cmd.Parameters.AddWithValue("@FechaPrimeraDosis", obj.FechaPrimeraDosis);
                        cmd.Parameters.AddWithValue("@Opcion", 1);

                        dataProccess = new DataProccess();
                        res = dataProccess.DataProcessValidate(cmd);

                        switch (res.Value<int>("response"))
                        {
                            case 0:
                                return BadRequest(res.response);
                            case 1:
                                return Ok(res);
                            default:
                                return BadRequest(res.response);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("update")]
        public IActionResult Update(VacunaModel obj)
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IDVacuna", obj.IdVacuna);
                        cmd.Parameters.AddWithValue("@IDEmpleado", obj.IdEmpleado);
                        cmd.Parameters.AddWithValue("@IDTipoVacuna", obj.IdTipoVacuna);
                        cmd.Parameters.AddWithValue("@FechaPrimeraDosis", obj.FechaPrimeraDosis);
                        cmd.Parameters.AddWithValue("@Opcion", 2);

                        dataProccess = new DataProccess();
                        res = dataProccess.DataProcessValidate(cmd);

                        switch (res.Value<int>("response"))
                        {
                            case 0:
                                return BadRequest(res.response);
                            case 1:
                                return Ok(res);
                            default:
                                return BadRequest(res.response);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("all")]
        public IActionResult GetAll()
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Opcion", 3);
                        dataProccess = new DataProccess();
                        res = dataProccess.DataProcessValidate(cmd);
                        return Ok(res);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("vac")]
        public IActionResult GetVac()
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Opcion", 4);
                        dataProccess = new DataProccess();
                        res = dataProccess.DataProcessValidate(cmd);
                        return Ok(res);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("reporte/{id}")]
        public IActionResult GetReporte(int id)
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IDEmpleado", id);
                        cmd.Parameters.AddWithValue("@Opcion", 5);
                        dataProccess = new DataProccess();
                        res = dataProccess.DataProcessValidate(cmd);
                        return Ok(res);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
