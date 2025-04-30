import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomCalendar.css';
import Modal from './Modal';
import './style.css';
import AgendaModal from './AgendaModal';

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
  const [agendaModalVisible, setAgendaModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  const fetchEvents = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users`);
    const data = await response.json();

    const mappedEvents = data.map(user => ({
      title: user.fullname,
      start: new Date(user.created_at),
      end: new Date(user.created_at),
      time: user.time,
      username: user.username,
      email: user.email,
      status: user.status,
      profile_image: user.profile_image
    }));

    setEvents(mappedEvents);
  };

  const fetchAgendas = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}agendas`);
    const data = await res.json();

    const randomColor = () => {
      const colors = [
        '#F87171', '#60A5FA', '#34D399', '#FBBF24', '#A78BFA',
        '#F472B6', '#86EFAC', '#93C5FD', '#FCD34D', '#C4B5FD',
        '#FDA4AF', '#FDE68A', '#BFDBFE', '#DDD6FE', '#FDBA74'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const mappedAgendas = data.map(agenda => ({
      id: agenda.id,
      title: agenda.title,
      start: new Date(agenda.date + 'T' + agenda.time),
      end: new Date(agenda.date + 'T' + agenda.time),
      description: agenda.description,
      color: randomColor(),
      time: agenda.time, // <-- Add time!
    }));    

    setEvents(prev => [...prev, ...mappedAgendas]);
  };

  useEffect(() => {
    fetchEvents();
    fetchAgendas();
  }, []);

  const handleEventClick = (event) => {
    setSelectedAgenda(event);
    setSelectedDate(event.start);
    setAgendaModalVisible(true);
  };

  const handleSlotSelect = (slotInfo) => {
    const selected = new Date(slotInfo.start);
    selected.setHours(0, 0, 0, 0);
    setSelectedDate(selected);
    setSelectedAgenda(null); // Reset selected agenda for new entry
    setAgendaModalVisible(true);
  };

  const handleAgendaAdded = (agenda) => {
    setEvents(prev => [
      ...prev,
      {
        id: agenda.id,
        title: agenda.title,
        start: new Date(agenda.date + 'T' + agenda.time),
        end: new Date(agenda.date + 'T' + agenda.time),
        description: agenda.description,
        color: agenda.color,
      },
    ]);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser (null);
  };

  return (
    <>
      <Modal user={selectedUser } visible={modalVisible} onClose={closeModal} />
      <AgendaModal
        visible={agendaModalVisible}
        date={selectedDate}
        agenda={selectedAgenda}
        onClose={() => {
          setAgendaModalVisible(false);
          setSelectedAgenda(null);
        }}
        onAgendaAdded={handleAgendaAdded}
        onAgendaUpdated={(updatedAgenda) => {
          setEvents(prev => prev.map(ev =>
            ev.id === updatedAgenda.id
              ? {
                  ...ev,
                  title: updatedAgenda.title,
                  description: updatedAgenda.description,
                  start: new Date(updatedAgenda.date + 'T' + updatedAgenda.time),
                  end: new Date(updatedAgenda.date + 'T' + updatedAgenda.time),
                  time: updatedAgenda.time,
                }
              : ev
          ));
        }}
        onAgendaDeleted={(deletedAgenda) => {
          setEvents(prev =>
            prev.filter(ev => ev.id !== deletedAgenda.id)
          );
        }}
      />
      <div className="calendar-container">
      <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', width: '100%' }}
          onSelectEvent={handleEventClick}
          onSelectSlot={handleSlotSelect}
          selectable={true}
          eventPropGetter={(event) => {
            const backgroundColor = event.color || '#3b82f6';
            return {
              style: {
                backgroundColor,
                color: '#fff',
                borderRadius: '8px',
                border: 'none',
                padding: '4px',
              },
            };
          }}
          components={{
            event: ({ event }) => (
              <span>
                {event.start instanceof Date ? event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' : ''}
                {event.title}
              </span>
            )
          }}
        />
      </div>
    </>
  );
};

export default CalendarRegister;