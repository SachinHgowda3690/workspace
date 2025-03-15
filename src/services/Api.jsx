import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api';

export const fetchClients = () => axios.get(`${API_BASE_URL}/clients`);
export const addClient = (client) => axios.post(`${API_BASE_URL}/client`, client);
export const updateClient = (id, client) => axios.patch(`${API_BASE_URL}/client/${id}`, client);
export const deleteClient = (id) => axios.delete(`${API_BASE_URL}/client/${id}`);

export const fetchMeetings = () => axios.get(`${API_BASE_URL}/meetings`);
export const scheduleMeeting = (clientId, meeting) =>
  axios.post(`${API_BASE_URL}/meeting?clientId=${clientId}`, meeting);
export const updateMeeting = (id, meeting) => axios.patch(`${API_BASE_URL}/meeting/${id}`, meeting);

export const cancelMeeting = (id) => axios.delete(`${API_BASE_URL}/meeting/${id}`);


export const fetchMeetingById = (id) => axios.get(`${API_BASE_URL}/meeting/${id}`);
