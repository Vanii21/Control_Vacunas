import PropTypes from 'prop-types';

const Itemnav = ({icon, title, link}) => {
  return (
    <li className="sidebar-list-item">
        <a href={link}>
            <span className="material-icons-outlined">{icon}</span> {title}
        </a>
    </li>
  )
}

Itemnav.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default Itemnav
