// components/Flashcard/Slider.js
import React from 'react';
import Slider from 'react-slider';
import './slider.scss'; // Import your custom styles here

const CustomSlider = ({ value, onChange }) => (
  <Slider
    value={value}
    onChange={onChange}
    min={0}
    max={100}
    step={1}
    withBars
    pearling
    minDistance={10}
  />
);

export default CustomSlider;
