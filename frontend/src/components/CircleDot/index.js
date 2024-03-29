import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const CircleDot = ({ x, y, onClick, isSelected, color, number, showOutline }) => (
  <div
    className={`circle-dot ${isSelected ? 'highlight' : ''}`}
    style={{
      left: x,
      top: y,
      background: isSelected ? '#383838' : color,
      outline: showOutline ? '1px solid #f77f60' : 'none', // Set outline style conditionally
      boxShadow: isSelected ? '0 0 0 1px #000' : 'none', // Remove box shadow or customize as needed
    }}
    onClick={onClick}
  >
    <p>{number}</p>
  </div>
);

CircleDot.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  color: PropTypes.string,
  number: PropTypes.number.isRequired,
  showOutline: PropTypes.bool, // New prop for showing outline
};

export default CircleDot;
