import data from '../data/data_navbar';
import Itemnav from './Itemnav';

const Navbar = () => {
  return (
    <aside id="sidebar">
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <span className="material-icons-outlined">inventory</span> APP VACUNA
          </div>
        </div>

        <ul className="sidebar-list">
          {data.map( ({icon, title, link}) => (<Itemnav key={title} icon={icon} title={title} link={link} /> ) )}
        </ul>
    </aside>
  )
}

export default Navbar;
