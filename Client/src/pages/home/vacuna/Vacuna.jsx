
import { useEffect, useState } from 'react';
import { showAlertAccept, showAlertError } from '../../../helpers/alerts/showAlert';
import './vacuna.css'
import axios from 'axios';
import Select from 'react-select';

const Vacuna = () => {
  const [formData, setFormData] = useState({
    IdEmpleado: '',
    IdTipoVacuna: '',
    FechaPrimeraDosis: ''
  });

  const [empleados, setEmpleados] = useState([]);
  const [tiposVacuna, setTiposVacuna] = useState([]);

  useEffect(() => {
    fetchEmpleados();
    fetchTiposVacuna();
  }, []);

  const fetchEmpleados = () => {
    axios.get('https://localhost:7176/api/empleado/emp')
      .then(response => {
        const { data } = response.data
        const empleadosData = data.map(empleado => ({
          value: empleado.IdEmpleado,
          label: `${empleado.IdEmpleado} - ${empleado.Nombre}`
        }));
        setEmpleados(empleadosData);
      })
      .catch(error => console.error('Error fetching empleados:', error));
  };

  const fetchTiposVacuna = () => {
    axios.get('https://localhost:7176/api/vacuna/vac')
      .then(response => {
        const { data } = response.data;
        setTiposVacuna(data);
      })
      .catch(error => console.error('Error fetching tipos de vacuna:', error));
  };
  
  const handleChangeEmpleado = (selectedOption) => {
    setFormData({
      ...formData,
      IdEmpleado: selectedOption ? selectedOption.value : ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7176/api/vacuna/add', formData)
      .then(response => {
        showAlertAccept('Vacuna agregada con éxito', response.data);
        // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o limpiar el formulario.
      })
      .catch(error => {
        showAlertError('Error al agregar la vacuna: ', error);
        // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario.
      });
  };

  return (
    <div className="card">
      <div className="card-inner">
        <h2 className="text-primary">AGREGAR DOSIS DE VACUNACION</h2>
        <form onSubmit={handleSubmit} className="form-vacuna">
          <div className="form-group">
            <label className="text-primary">Empleado:</label>
            <Select
              name="IdEmpleado"
              options={empleados}
              onChange={handleChangeEmpleado}
              placeholder="Seleccione un empleado"
              isClearable
            />
          </div>
          <div className="form-group">
            <label className="text-primary">Tipo de Vacuna:</label>
            <select
              name="IdTipoVacuna"
              value={formData.IdTipoVacuna}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>Seleccione un tipo de vacuna</option>
              {tiposVacuna.map( ({IdTipoVacuna, NombreVacuna}) => (
                <option key={IdTipoVacuna} value={IdTipoVacuna}>
                  {NombreVacuna}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="text-primary">Fecha de la Primera Dosis:</label>
            <input
              type="date"
              name="FechaPrimeraDosis"
              value={formData.FechaPrimeraDosis}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-submit">Agregar Vacuna</button>
        </form>
      </div>
    </div>
  );
};

export default Vacuna;

