import PropTypes from 'prop-types';

const Layaut = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

Layaut.propTypes = {
    children: PropTypes.any.isRequired
  }

export default Layaut
