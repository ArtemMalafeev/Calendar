import moment from 'moment';
import styled from 'styled-components';
import Header from '../Header';
import Monitor from '../Monitor';
import CalendarGrid from '../CalendarGrid';
import Footer from '../Footer'
import { useEffect, useState } from 'react'

const CalendarWrapper = styled('div')`
    border-radius: 8px;
    border: 1px solid #464648;
    overflow: hidden;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const url = 'http://localhost:3001';
const totalDays = 42;

function Index() {
  
  moment.updateLocale('en', { week: { dow: 1 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');
  
  const prevHandler = () => {
    setToday((prev) => {
      return prev.clone().subtract(1, 'month');
    });
  };
  
  const todayHandler = () => {
    setToday(() => moment());
  };
  
  const nextHandler = () => {
    setToday((prev) => {
      return prev.clone().add(1, 'month');
    });
  };
  
  const [events, setEvents] = useState([]);
  
  const startDateQuery = startDay.clone().format('X'); 
  const endDateQuery = startDay.clone().add(totalDays, 'day').format('X');

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setEvents(data);
    })
  }, []);
  
  return (
    <>
      <CalendarWrapper>
        <Header />
        <Monitor
            today={today}
            prevHandler={prevHandler}
            todayHandler={todayHandler}
            nextHandler={nextHandler}
        />
        <CalendarGrid startDay={startDay} today={today} totalDays={totalDays}/>
      </CalendarWrapper>
      <Footer />
    </>
  );
}

export default Index;
