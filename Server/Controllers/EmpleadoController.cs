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
    public class EmpleadoController : ControllerBase
    {
        private readonly IConfiguration Configuration;
        private readonly string _connectionString;
        private readonly string _nameProcedure;

        DataProccess dataProccess;

        public EmpleadoController(IConfiguration configuration)
        {
            Configuration = configuration;
            _connectionString = Configuration.GetConnectionString("MainConnection");
            _nameProcedure = "pc_empleado";
        }

        [HttpPost]
        [Route("add")]
        public IActionResult Add(EmpleadoModel obj)
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Nombre", obj.Nombre);
                        cmd.Parameters.AddWithValue("@PuestoLaboral", obj.PuestoLaboral);
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
        public IActionResult Update(EmpleadoModel obj)
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdEmpleado", obj.IdEmpleado);
                        cmd.Parameters.AddWithValue("@Nombre", obj.Nombre);
                        cmd.Parameters.AddWithValue("@PuestoLaboral", obj.PuestoLaboral);
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

        [HttpPost]
        [Route("state/{id}")]
        public IActionResult UpdateState(int id)
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdEmpleado", id);
                        cmd.Parameters.AddWithValue("@Opcion", 3);
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
        [Route("one/{id}")]
        public IActionResult GetOne(int id)
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdEmpleado", id);
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

        [HttpGet]
        [Route("dash")]
        public IActionResult GetDash()
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Opcion", 6);
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
        [Route("emp")]
        public IActionResult GetEmp()
        {
            dynamic res;

            try
            {
                using (SqlConnection conn = ConnectionSqlServer.Connection(Configuration))
                {
                    using (SqlCommand cmd = new SqlCommand(_nameProcedure, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Opcion", 7);
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
