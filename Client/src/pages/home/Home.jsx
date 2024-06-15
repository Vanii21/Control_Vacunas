import { Routes, Route } from 'react-router-dom';
import Navbar from "../../components/Navbar"
import Main from "./dashboard/Main"
import Layaut from '../../components/Layaut';
import Empleado from './empleado/Empleado';
import Vacuna from './vacuna/Vacuna';


const Home = () => {

  return (
    <div className="grid-container">
      <Navbar />
      <main className="main-container">
        <Layaut>
          <Routes>
            <Route path='/dashboard' element={<Main />} />
            <Route path='/empleado' element={<Empleado />} />
            <Route path='/vacuna' element={<Vacuna />} />
          </Routes>
        </Layaut>
      </main>
    </div>
        
  )
}

export default Home
