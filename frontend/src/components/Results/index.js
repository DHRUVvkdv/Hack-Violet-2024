import React, { useState, useEffect } from 'react';
import CircleDot from '../CircleDot';
import './index.scss';
import TopNav from '../navbar/TopNav';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

let outline_day;

const ResultsPage = () => {
  const [selectedDot, setSelectedDot] = useState(null);
  const [phase, setPhase] = useState('Outbreak');
  const [dateRange, setDateRange] = useState(null);
  const [email, setEmail] = useState('');
  const [periodStartDate, setPeriodStartDate] = useState(null);
  const [periodDuration, setPeriodDuration] = useState(0);

  const luteal_text =
    'The luteal phase happens in the second part of your menstrual cycle. It begins around day 15 of a 28-day cycle and ends when you get your period. The luteal phase prepares your uterus for pregnancy by thickening your uterine lining. A disorder involving your luteal phase can affect getting and staying pregnant.';
  const ovulation_text =
    'Ovulation is when a mature egg is released from an ovary and moves along a fallopian tube towards your uterus. This usually happens once each month, about two weeks before your next period. Ovulation can last from 16 to 32 hours.';
  const folicular_text =
    'The follicular phase, also known as the preovulatory phase or proliferative phase, is the phase of the estrous cycle during which follicles in the ovary mature from primary follicle to a fully mature graafian follicle. It ends with ovulation.';
  const menstrual_text =
    'Menopause is divided into three basic stages: perimenopause, menopause, and postmenopause. During this time, the ovaries begin to atrophy which causes a decline in the production of the hormones that stimulate the menstrual cycle; estrogen and progesterone.';

  let startDate = new Date(2022, 2, 1);

  const numOfDots = 28;
  const radius = 330;
  const centerX = 0;
  const centerY = 0;

  useEffect(() => {
    const fetchDataOnDotChange = async () => {
      if (selectedDot !== null) {
        setPhase(calculatePhase(selectedDot));
        setDateRange(calculateDateRange(selectedDot));
      }
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userEmail = decoded.email;
        setEmail(userEmail);
        console.log(userEmail);
      } else {
        alert('User Not Signed up!');
      }
    };

    fetchDataOnDotChange();

    // Other logic based on selectedDot...

  }, [selectedDot]);

  useEffect(() => {
    const fetchDataOnPageLoad = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/data/periodCycle/${email}`);
        console.log(response.data);
        setPeriodDuration(response.data.duration || 3);
        setPeriodStartDate(response.data.startDate);
        startDate = periodStartDate
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataOnPageLoad();
  }, [email]); // Updated dependency array

  const calculateDotPosition = (index) => {
    const angle = (index / numOfDots) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  async function getPeriodCycle(userEmail) {
    try {
      const response = await axios.get(`http://localhost:8000/api/data/periodCycle/${userEmail}`);
      console.log(response.data);
      setPeriodDuration(response.data.duration || 3);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getDotColor = (index) => {
    if (index >= 21 && index < (21 + periodDuration)) {
      return '#a06868';
    } else if (index >= 0 && index < 7) {
      return '#d4abb3';
    } else if (index >= 7 && index < 9) {
      return '#decbc4';
    } else {
      return '#b4876b';
    }
  };

  const calculatePhase = (index) => {
    console.log('periodDuration:', periodDuration); 
    const adjustedDuration = (periodDuration + 22) % 28;
    if (index >= 21 && index < (21 + periodDuration)) {
      return 'Menstrual';
    } else if (index >= 0 && index < 7) {
      return 'Luteal';
    } else if (index >= 7 && index < 9) {
      return 'Ovulation';
    } else  {
      return 'Follicular';
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'Luteal':
        return luteal_text;
      case 'Ovulation':
        return ovulation_text;
      case 'Follicular':
        return folicular_text;
      case 'Menstrual':
        return menstrual_text;
      default:
        return menstrual_text;
    }
  };

  const calculateDateRange = (index) => {
    const day = ((index + 7) % 28) + 1;
    console.log("aslddnlfj: ", typeof periodStartDate);
    startDate = new Date(periodStartDate);
    if (day >= 1 && day <= 7) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      return { startDate, endDate };
    } else if (day >= 8 && day <= 14) {
      const newStartDate = new Date(startDate);
      newStartDate.setDate(startDate.getDate() + 7);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 11);
      startDate = newStartDate;
      return { startDate, endDate };
    } else if (day >= 15 && day <= 16) {
      const newStartDate = new Date(startDate);
      newStartDate.setDate(startDate.getDate() + 12);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 18);
      startDate = newStartDate;
      return { startDate, endDate };
    } else {
      const newStartDate = new Date(startDate);
      newStartDate.setDate(startDate.getDate() + 19);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 27);
      startDate = newStartDate;
      return { startDate, endDate };
    }
  };

  const handleDotClick = (index) => {
    setSelectedDot(index);
  };

  return (
    <div className="results-container">
      <TopNav />
      <div className="circle-dot-container">
        {Array.from({ length: numOfDots }, (_, index) => {
          const position = calculateDotPosition(index)
          const color = getDotColor(index)
          const current_date = new Date()
          console.log("sdjfensdejf curr date: ", typeof current_date)
          const timeDifference = current_date - new Date(periodStartDate)
          console.log("time diff: ", timeDifference)
          const magic_num = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          outline_day = ((21 + magic_num) % 28) 
          console.log("sdkjfnkjrjksndfckjs: ", typeof periodStartDate)
          const showOutline = index === outline_day
          return (
            <CircleDot
              key={index}
              x={position.x}
              y={position.y}
              onClick={() => handleDotClick(index)}
              isSelected={selectedDot === index}
              color={color}
              number={((index + 7) % 28) + 1}
              showOutline={showOutline}
            />
          )
        })}
      </div>
      {selectedDot !== null && (
        <div className="selected-dot-info">
          <h3>{phase}</h3>
          {dateRange && dateRange.startDate && dateRange.endDate && (
            <h4>
              {dateRange.startDate.toLocaleDateString()} to{' '}
              {dateRange.endDate.toLocaleDateString()}
            </h4>
          )}
          <h1>Day {((selectedDot + 7) % 28) + 1}</h1>
          <p className="main-text">{getPhaseText()}</p>
        </div>
      )}
    </div>
  )
}

export default ResultsPage
