// CalendarComponent.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Navbar } from '../components/Navbar';

const CalendarComponent = () => {
  const events = [
    { title: 'Event 1', date: '2024-10-10' },
    { title: 'Event 2', date: '2024-10-15' },
  ];

  return (
    <div>
      <Navbar/>
      <h2>My Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events} // Pass your events here
      />
    </div>
  );
};

export default CalendarComponent;
