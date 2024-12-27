import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api';

function GiveKudosPage() {
  const [users, setUsers] = useState([]);
  const [kudosTypes, setKudosTypes] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
    fetch(`${API_URL}/kudos-types`)
      .then(res => res.json())
      .then(data => setKudosTypes(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/kudos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, type, message }),
    })
      .then(res => {
        if (res.ok) {
          alert('Kudos sent successfully!');
          setFrom('');
          setTo('');
          setType('');
          setMessage('');
        } else {
          throw new Error('Error sending kudos');
        }
      })
      .catch(err => alert(err.message));
  };

  return (
    <div>
      <h1>Give Kudos</h1>
      <form onSubmit={handleSubmit}>
        <select value={from} onChange={e => setFrom(e.target.value)} required>
          <option value="">Select From</option>
          {users.map(user => <option key={user} value={user}>{user}</option>)}
        </select>
        <select value={to} onChange={e => setTo(e.target.value)} required>
          <option value="">Select To</option>
          {users.map(user => <option key={user} value={user}>{user}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} required>
          <option value="">Select Kudos Type</option>
          {kudosTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <textarea value={message} onChange={e => setMessage(e.target.value)} required />
        <button type="submit">Send Kudos</button>
      </form>
      <Link to="/home">Back to Home</Link>
    </div>
  );
}

export default GiveKudosPage;

