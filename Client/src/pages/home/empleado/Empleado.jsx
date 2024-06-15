import { useState, useEffect } from 'react';
import { showAlertAccept, showAlertError } from '../../../helpers/alerts/showAlert';
import axios from 'axios';
import Pagination from '../../../components/Pagination';
import './empleado.css'

const Empleado = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [codigoBusqueda, setCodigoBusqueda] = useState('');
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    puestoLaboral: '',
    estadoVacunacion: '',
    estado: ''
  });
  const [empleadoEditando, setEmpleadoEditando] = useState(null);
  const [mostrarFormularioEdicion, setMostrarFormularioEdicion] = useState(false);
  const [empleadoVacunacion, setEmpleadoVacunacion] = useState(null);
  const [mostrarFormularioVacunacion, setMostrarFormularioVacunacion] = useState(false);

  // Obtener los empleados actuales
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = data.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Muestra toda la informacion de los empleados
    axios.get(`https://localhost:7176/api/empleado/all`)
      .then(response => {
        const { data } = response.data;
        setData(data);
      })
      .catch(error => console.error(error));
  };

  const handleBuscar = () => {
    // Realizar la búsqueda por código de empleado
    axios.get(`https://localhost:7176/api/empleado/one/${codigoBusqueda}`)
      .then(response => {
        const { data } = response.data
        setData(data);
      })
      .catch(error => console.error(error));
  };

  const handleAgregar = () => {
    // Agregar un nuevo empleado
    axios.post('https://localhost:7176/api/empleado/add', nuevoEmpleado)
      .then(() => {
        setNuevoEmpleado({
          nombre: '',
          puestoLaboral: '',
          estadoVacunacion: '',
          estado: ''
        });
        showAlertAccept('Se ha agregado correctamente');
        fetchData();
      })
      .catch(error => console.error(error));
  };

  const handleEditar = (id) => {
    // Encontrar el empleado a editar y mostrar el formulario de edición
    const empleado = data.find(emp => emp.IdEmpleado === id);
    setEmpleadoEditando({
      IdEmpleado: empleado.IdEmpleado,
      nombre: empleado.Nombre,
      puestoLaboral: empleado.PuestoLaboral,
    });
    setMostrarFormularioEdicion(true);
  };

  const handleVacunacion = (id, vacuna) => {
    if (vacuna) {
      axios.get(`https://localhost:7176/api/vacuna/reporte/${id}`)
        .then(response => {
          const { data } = response.data;
          console.log(data[0]);
          setEmpleadoVacunacion(data[0]);
          setMostrarFormularioVacunacion(true);
        })
        .catch(error => console.error(error));
    } else {
      showAlertError('El empleado no cuenta con ninguna dosis')
    }
      
  };

  const handleGuardarEdicion = () => {
    // Guardar los cambios del empleado editado
    axios.post(`https://localhost:7176/api/empleado/update`, empleadoEditando)
      .then(() => {
        setMostrarFormularioEdicion(false);
        setEmpleadoEditando({
          IdEmpleado: '',
          nombre: '',
          puestoLaboral: '',
          estadoVacunacion: '',
          estado: ''
        });
        showAlertAccept('Se ha editado correctamente');
        fetchData();
      })
      .catch(error => console.error(error));
  };

  const handleEliminar = (id) => {
    // Eliminar un empleado
    axios.post(`https://localhost:7176/api/empleado/state/${id}`)
      .then(() => {
        showAlertAccept('Se ha eliminado correctamente');
        fetchData();
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <div className="main-title">
        <p className="font-weight-bold">LISTA DE EMPLEADOS</p>
      </div>

      <div className="main-cards">
        {/* Formulario de búsqueda */}
        
        <div className="card search-card">
          <p className="font-weight-bold">Buscar Empleado</p>
          <div className="card-inner">
            <input
              type="text"
              placeholder="Código de empleado"
              value={codigoBusqueda}
              onChange={(e) => setCodigoBusqueda(e.target.value)}
            />
            <button onClick={handleBuscar}>Buscar</button>
          </div>
        </div>

        {/* Formulario de agregar empleado */}
        <div className="card add-card">
          <p className="font-weight-bold">Agregar Empleado</p>
          <div className="card-inner">
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoEmpleado.nombre}
              onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Puesto Laboral"
              value={nuevoEmpleado.puestoLaboral}
              onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, puestoLaboral: e.target.value })}
            />
            <button onClick={handleAgregar}>Agregar</button>
          </div>
        </div>
      </div>

      {/* Formulario de edición de empleado */}
      {mostrarFormularioEdicion && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setMostrarFormularioEdicion(false)}>&times;</span>
            <p className="font-weight-bold">Editar Empleado</p>
            <div className="card-inner">
              <input
                type="text"
                placeholder="Nombre"
                value={empleadoEditando.nombre}
                onChange={(e) => setEmpleadoEditando({ ...empleadoEditando, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Puesto Laboral"
                value={empleadoEditando.puestoLaboral}
                onChange={(e) => setEmpleadoEditando({ ...empleadoEditando, puestoLaboral: e.target.value })}
              />
              <button onClick={handleGuardarEdicion}>Guardar</button>
              <button onClick={() => setMostrarFormularioEdicion(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de reporte de vacunación */}
      {mostrarFormularioVacunacion && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setMostrarFormularioVacunacion(false)}>&times;</span>
            <p className="font-weight-bold">REPORTE DE VACUNACION</p>
            <div className="card-inner">
              <div className="form-group">
                <label>Nombre del Empleado:</label>
                <p>{empleadoVacunacion.Nombre}</p>
              </div>
              <div className="form-group">
                <label>Fecha de la Primera Dosis:</label>
                <p>{empleadoVacunacion.FechaPrimeraDosis}</p>
              </div>
              <div className="form-group">
                <label>Vacuna Administrada:</label>
                <p>{empleadoVacunacion.NombreVacuna}</p>
              </div>
              <div className="form-group">
                <label>Fecha de la Segunda Dosis:</label>
                <p className="highlighted">{empleadoVacunacion.FechaSegundaDosis}</p>
              </div>
              <button onClick={() => setMostrarFormularioVacunacion(false)}>Aceptar</button>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de empleados */}
      <div className="charts">
        <div className="charts-card">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Puesto Laboral</th>
                <th>Primera Dosis</th>
                <th>Vacuna Administrada</th>
                <th>Estado Vacunación</th>
                <th>Seguimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map(({ IdEmpleado, Nombre, PuestoLaboral, FechaPrimeraDosis, NombreVacuna, EstadoVacunacion}) => (
                <tr key={IdEmpleado}>
                  <td>{IdEmpleado}</td>
                  <td>{Nombre}</td>
                  <td>{PuestoLaboral}</td>
                  <td>{FechaPrimeraDosis}</td>
                  <td>{NombreVacuna}</td>
                  <td>{EstadoVacunacion}</td>
                  <td>
                    <a href="#" onClick={() => handleVacunacion(IdEmpleado, NombreVacuna)} style={{ display: 'flex', alignItems: 'center', color: 'blue', cursor: 'pointer' }}>
                      <span className="material-icons-outlined" style={{ marginRight: '5px' }}>calendar_today</span>
                      Cita
                    </a>
                  </td>
                  <td>
                    <button 
                        onClick={() => handleEditar(IdEmpleado)} 
                        style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
                      >
                        <span className="material-icons-outlined">edit</span>
                      </button>
                      <button 
                        onClick={() => handleEliminar(IdEmpleado)} 
                        style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
                      >
                        <span className="material-icons-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            employeesPerPage={employeesPerPage}
            totalEmployees={data.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  )
}

export default Empleado
