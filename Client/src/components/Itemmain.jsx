import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Itemmain = ({icon, title, color, ke}) => {
  const [dat, setDat] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`https://localhost:7176/api/empleado/dash`)
      .then(response => {
        const { data } = response.data;
        setDat(data[0]);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="card">
      <div className="card-inner">
        <p className="text-primary">{title}</p>
        <span className={`material-icons-outlined ${color}`}>{icon}</span>
      </div>
      <span className="text-primary font-weight-bold">{dat[ke]}</span>
    </div>
  );
};

Itemmain.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  ke: PropTypes.string.isRequired
};

export default Itemmain;
