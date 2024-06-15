import PropTypes from 'prop-types';

const Pagination = ({ employeesPerPage, totalEmployees, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
}

Pagination.propTypes = {
    employeesPerPage: PropTypes.any.isRequired,
    totalEmployees: PropTypes.any.isRequired,
    paginate: PropTypes.any.isRequired
}

export default Pagination
