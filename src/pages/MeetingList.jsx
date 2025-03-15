import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchClients, cancelMeeting } from '../services/Api';

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [clientMap, setClientMap] = useState({});

  useEffect(() => {
    fetchClients().then((response) => {
      const clients = response.data;
      const meetingList = [];
      const clientDictionary = {};

      // Process clients and extract meetings
      clients.forEach(client => {
        clientDictionary[client.id] = client.name; // Store client ID-to-name mapping
        client.meetings.forEach(meeting => {
          meetingList.push({
            ...meeting,
            clientName: client.name, // Attach client name to each meeting
            clientId: client.id
          });
        });
      });

      setClientMap(clientDictionary);
      setMeetings(meetingList);
    });
  }, []);

  const handleCancel = (id) => {
    cancelMeeting(id).then(() => {
      setMeetings(meetings.filter((meeting) => meeting.id !== id));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Meeting List</h2>
      <Link to="/meetings/schedule" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Schedule Meeting
      </Link>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Client Name</th>
            <th className="border p-2">Meeting Time</th>
            <th className="border p-2">Agenda</th>
            <th className="border p-2">Notes</th> {/* Add Notes Column */}
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <tr key={meeting.id} className="text-center">
                <td className="border p-2">{meeting.id}</td>
                <td className="border p-2">{meeting.clientName || 'Unknown Client'}</td>
                <td className="border p-2">
                  {meeting.meeting_time
                    ? new Date(meeting.meeting_time).toLocaleString()
                    : 'Invalid Date'}
                </td>
                <td className="border p-2">{meeting.agenda}</td>
                <td className="border p-2">{meeting.notes || 'No Notes'}</td> {/* Display Notes */}
                <td className="border p-2 space-x-2">
                  <Link
                    to={`/meetings/edit/${meeting.id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleCancel(meeting.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border p-2 text-center">
                No meetings scheduled.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingList;