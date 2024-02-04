import React, { useState } from 'react';
import './index.scss';
import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars'


const RangeCalendar = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    return (
        <div className='range-calendar-container'>
            <DateRangePickerComponent></DateRangePickerComponent>
        </div>
    );
};

export default RangeCalendar;
