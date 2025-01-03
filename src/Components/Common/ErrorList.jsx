import React from 'react';
import PropTypes from 'prop-types';
import './ErrorList.css';

/**
 * Компонент для отображения списка ошибок.
 * @param {Object} props
 * @param {string[]} props.errors - Массив сообщений об ошибках.
 */
const ErrorList = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="error-list">
      {errors.map((error, index) => (
        <p key={index} className="error-item">
          {error}
        </p>
      ))}
    </div>
  );
};

ErrorList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default ErrorList;