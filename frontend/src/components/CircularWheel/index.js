import React from 'react'
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
} from 'react-circular-input'
import './index.scss' // Create this stylesheet for styling if needed

const CircularWheel = ({ value, onChange }) => {
  const generateLabelText = (scaledValue) => {
    console.log('Scaled Value:', scaledValue)

    const intValue = Math.round(scaledValue * 28) // Scale to an integer between 1 and 28

    if (intValue >= 1 && intValue <= 5) {
      return 'Menstruation'
    } else if (intValue >= 6 && intValue <= 14) {
      return 'The Follicular Phase'
    } else if (intValue === 15) {
      return 'Ovulation'
    } else if (intValue >= 16 && intValue <= 28) {
      return 'The Luteal Phase'
    } else {
      return 'Invalid day'
    }
  }

  return (
    <div className="circular-slider-container">
      <CircularInput
        value={value}
        onChange={onChange}
        min={0}
        max={1}
        step={0.01}
      >
        <CircularTrack strokeWidth={8} />
        <CircularProgress />
      </CircularInput>
      <div className="label-container">
        <div className="phase-label">{generateLabelText(value)}</div>
      </div>
    </div>
  )
}

export default CircularWheel
