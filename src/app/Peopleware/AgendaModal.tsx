import React, { useState, useEffect } from 'react';
import './AgendaModal.css';

interface Props {
    visible: boolean;
    date: Date | null;
    onClose: () => void;
    onAgendaAdded: (agenda: any) => void;
    agenda?: any; // For edit/delete
    onAgendaUpdated?: (agenda: any) => void;
    onAgendaDeleted?: (agenda: any) => void;
}

const AgendaModal: React.FC<Props> = ({
  visible,
  date,
  onClose,
  onAgendaAdded,
  agenda,
  onAgendaUpdated,
  onAgendaDeleted
}) => {
    const [title, setTitle] = useState(agenda?.title || '');
    const [description, setDescription] = useState(agenda?.description || '');
    const [time, setTime] = useState(agenda?.time?.slice(0, 5) || ''); // '09:30:00' → '09:30'

    useEffect(() => {
      if (agenda) {
        setTitle(agenda.title);
        setDescription(agenda.description);
        setTime(agenda.time?.slice(0, 5) || '');
      } else {
        setTitle('');
        setDescription('');
        setTime('');
      }
    }, [agenda]);
    
    const formatDateLocal = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const formattedDate = date ? formatDateLocal(date) : null;
  
      const payload = {
        title,
        description,
        date: formattedDate,
        time,
      };
  
      const url = agenda
        ? `${process.env.NEXT_PUBLIC_API_URL}agendas/${agenda.id}/update`
        : `${process.env.NEXT_PUBLIC_API_URL}agendas`;
  
      const res = await fetch(url, {
        method: agenda ? 'POST' : 'POST', // Use PUT for updates
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
      if (agenda && onAgendaUpdated) {
        onAgendaUpdated(data);
      } else {
        onAgendaAdded(data);
      }
  
      onClose();
    };
  
    const handleDelete = async () => {
      if (!agenda) return;
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}agendas/${agenda.id}/delete`, {
        method: 'DELETE',
      });
  
      if (res.ok && onAgendaDeleted) {
        onAgendaDeleted(agenda);
      }
  
      onClose();
    };
  
    if (!visible || !date) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{agenda ? 'Edit Agenda' : 'Add Agenda'} for {date.toDateString()}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="time"
              value={time}
              required
              onChange={(e) => setTime(e.target.value)}
            />
            <button type="submit">{agenda ? 'Update' : 'Save'} Agenda</button>
            {agenda && <button type="button" onClick={handleDelete}>Delete</button>}
            <button type="button" onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    );
};

export default AgendaModal;