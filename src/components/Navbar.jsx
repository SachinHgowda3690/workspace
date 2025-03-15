import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Client Management App</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/clients" className="hover:text-blue-200">Clients</Link>
          <Link to="/meetings" className="hover:text-blue-200">Meetings</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;