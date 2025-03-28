// components/CustomCalendar.js
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomCalendar.css'; // Import the CSS file
import Modal from './Modal'; // Import the Modal component
import './style.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const CalendarRegister = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser , setSelectedUser ] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users`);
      const data = await response.json();

      // Map the user data to calendar events
      const mappedEvents = data.map(user => ({
        title: user.fullname, // Assuming 'fullname' is the field for the user's name
        start: new Date(user.created_at), // Use 'created_at' for the start date
        end: new Date(user.created_at), // Use the same date for the end date (single-day event)
        username: user.username, // Include username
        email: user.email, // Include email
        status: user.status, // Include status
        profile_image: user.profile_image
      }));

      setEvents(mappedEvents);
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedUser(event);
    setModalVisible(true);
    console.log('Event clicked:', event);
  };
  
  const closeModal = () => {
    setModalVisible(false); // Hide the modal
    setSelectedUser (null); // Clear the selected user data
  };

  return (
  <>
    <Modal user={selectedUser} visible={modalVisible} onClose={closeModal} />
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', width: '100%' }}
        onSelectEvent={handleEventClick}
      />
    </div>
  </>
  );
};

export default CalendarRegister;