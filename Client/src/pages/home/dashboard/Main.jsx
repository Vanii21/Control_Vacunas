import Barchart from '../../../components/Barchart';
import Itemmain from '../../../components/Itemmain';
import data1 from '../../../data/data_dashboard';


const Main = () => {


  return (
    <>
        <div className="main-title">
          <p className="font-weight-bold">DASHBOARD</p>
        </div>

        <div className="main-cards">

          {data1.map( ({icon, title, color, key}) => (<Itemmain key={title} icon={icon} title={title} color={color} ke={key} />))}

        </div>

        <div className="charts">

          <div className="charts-card">
            <p className="chart-title">Top vacunas mas administradas</p>
            <Barchart />
          </div>

        </div>
    </>
  )
}

export default Main
