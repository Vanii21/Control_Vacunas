import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LinearScale,
  Tooltip,
  Legend
)

const Barchart = () => {

    const [dat, setData] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = () => {
        axios.get(`https://localhost:7176/api/vacuna/all`)
          .then(response => {
            const { data } = response.data;
            setData(data);
          })
          .catch(error => console.error(error));
      };

      // Procesa los datos para obtener las etiquetas y las cantidades
      const labels = dat.map(item => item.NombreVacuna);
      const dataSet = dat.map(item => item.CantidadAdminsitrada);

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Cantidad de Administraciones',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(0,0,0,1)',
            data: dataSet // Aquí deberías poner los datos reales
          }
        ]
      };
    
    const options = {
        
      };

  return (
    <div>
        <Bar data={data} options={options} />
    </div>
  )
}

export default Barchart;
