import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchClients, scheduleMeeting, updateMeeting, fetchMeetingById } from '../services/Api';

const MeetingForm = () => {
  const { id } = useParams(); // Extract meeting ID from URL
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: '',
    meetingTime: '',
    agenda: '',
    notes: '',
  });

  useEffect(() => {
    // Fetch list of clients
    fetchClients().then((response) => setClients(response.data));

    // If editing, fetch the meeting details
    if (id) {
      fetchMeetingById(id).then((response) => {
        const meeting = response.data;
        setFormData({
          clientId: meeting.clientId, // Ensure clientId is set for editing
          meetingTime: meeting.meeting_time,
          agenda: meeting.agenda,
          notes: meeting.notes,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        clientId: formData.clientId, // Ensure clientId is included
        meeting_time: formData.meetingTime,
        agenda: formData.agenda,
        notes: formData.notes,
      };

      if (id) {
        // Update existing meeting
        await updateMeeting(id, payload);
        alert('Meeting updated successfully!');
      } else {
        // Schedule new meeting
        await scheduleMeeting(formData.clientId, payload);
        alert('Meeting scheduled successfully!');
      }
      navigate('/meetings');
    } catch (error) {
      console.error('Error saving meeting:', error.message);
      alert('Failed to save meeting. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Meeting' : 'Schedule Meeting'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Client Dropdown */}
        {!id && (
      <div>
        <label className="block text-sm font-medium">Select Client</label>
        <select
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select a Client --</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name} ({client.email})
            </option>
          ))}
        </select>
      </div>
    )}
        {/* Meeting Time */}
        <div>
          <label className="block text-sm font-medium">Meeting Time</label>
          <input
            type="datetime-local"
            name="meetingTime"
            value={formData.meetingTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Agenda */}
        <div>
          <label className="block text-sm font-medium">Agenda</label>
          <input
            type="text"
            name="agenda"
            value={formData.agenda}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {id ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default MeetingForm;
