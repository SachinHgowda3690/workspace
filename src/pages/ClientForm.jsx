import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addClient, updateClient, fetchClients } from '../services/Api'

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (id) {
      fetchClients().then((response) => {
        const existingClient = response.data.find((c) => c.id === parseInt(id));
        if (existingClient) setClient(existingClient);
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateClient(id, client).then(() => navigate('/clients'));
    } else {
      addClient(client).then(() => navigate('/clients'));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Client' : 'Add Client'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={client.name}
          onChange={(e) => setClient({ ...client, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={client.email}
          onChange={(e) => setClient({ ...client, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={client.phone}
          onChange={(e) => setClient({ ...client, phone: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={client.address}
          onChange={(e) => setClient({ ...client, address: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {id ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;