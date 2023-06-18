import React, { useState, useEffect } from 'react';
import styles from '../styles/app.module.css';

function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [monthData, setMonthData] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);

  const getMonthData = (year, month) => {
    // ... your existing code ...
  };

  const fetchHighlightedDates = async () => {
    try {
      const response = await fetch('/api/getDates');
      if (response.ok) {
        const data = await response.json();
        setHighlightedDates(data.dates);
      } else {
        console.log('Failed to fetch highlighted dates');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const monthData = getMonthData(year, month);
    setMonthData(monthData);
    fetchHighlightedDates();
  }, [selectedDate]);

  const prevMonth = () => {
    // ... your existing code ...
  };

  const nextMonth = () => {
    // ... your existing code ...
  };

  const selectDate = (day) => {
    // ... your existing code ...
  };

  function handleClick(day) {
    // ... your existing code ...
  }

  useEffect(() => {
    document.body.classList.add(styles["calendarBody"]);

    return () => {
      document.body.classList.remove(styles["calendarBody"]);
    };
  }, []);

  return (
    <section className="ftco-section">
      <div className="elegant-calencar d-md-flex">
        <div className="wrap-header d-flex align-items-center">
          <p id="reset" onClick={() => setSelectedDate(today)}>reset</p>
          <div id="header" className="p-0">
            <div className="pre-button d-flex align-items-center justify-content-center" onClick={prevMonth}>
              <i className="fa fa-chevron-left"></i>
            </div>
            <div className="head-info">
              <div className="head-day">{selectedDate.getDate()}</div>
              <div className="head-month">
                {selectedDate.toLocaleString('en-US', { month: 'long' })}
                {' - '}
                {selectedDate.toLocaleString('en-US', { year: 'numeric' })}
              </div>
            </div>
            <div className="next-button d-flex align-items-center justify-content-center" onClick={nextMonth}>
              <i className="fa fa-chevron-right"></i>
            </div>
          </div>
        </div>
        <div className="calendar-wrap">
          <table id="calendar">
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              {monthData.map((week, index) => (
                <tr key={index}>
                  {week.map((day, dayIndex) => {
                    const isHighlighted = highlightedDates.includes(day);
                    const cellClass = isHighlighted ? styles.highlighted : '';
                    return (
                      <td key={dayIndex} onClick={() => handleClick(day)} className={cellClass}>
                        {day}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="footer">CopyRight © 2023</p>
        </div>
      </div>
    </section>
  );
}

export default Calendar;
