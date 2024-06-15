import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';

const Rutas = () => {
  return (
    <Routes>
      <Route path='/*' element={<Home />}/>
    </Routes>
  )
}

export default Rutas
