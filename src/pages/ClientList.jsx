import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchClients, deleteClient } from '../services/Api'

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients().then((response) => setClients(response.data));
  }, []);

  const handleDelete = (id) => {
    deleteClient(id).then(() => {
      setClients(clients.filter((client) => client.id !== id));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Client List</h2>
      <Link to="/clients/add" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">Add Client</Link>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="text-center">
              <td className="border p-2">{client.id}</td>
              <td className="border p-2">{client.name}</td>
              <td className="border p-2">{client.email}</td>
              <td className="border p-2">{client.phone || 'N/A'}</td>
              <td className="border p-2">{client.address || 'N/A'}</td>
              <td className="border p-2 space-x-2">
                <Link to={`/clients/edit/${client.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</Link>
                <button onClick={() => handleDelete(client.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;