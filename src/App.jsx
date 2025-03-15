import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ClientList from './pages/ClientList';
import ClientForm from './pages/ClientForm';
import MeetingList from './pages/MeetingList';
import MeetingForm from './pages/MeetingForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/add" element={<ClientForm />} />
        <Route path="/clients/edit/:id" element={<ClientForm />} />
        <Route path="/meetings" element={<MeetingList />} />
        <Route path="/meetings/schedule" element={<MeetingForm />} />
        <Route path="/meetings/edit/:id" element={<MeetingForm />} />
      </Routes>
    </Router>
  );
}

export default App;