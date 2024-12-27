import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const API_URL = 'http://localhost:3001/api';

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/analytics`)
      .then(res => res.json())
      .then(data => setAnalytics(data));
  }, []);

  if (!analytics) return <div>Loading...</div>;

  return (
    <div>
      <h1>Analytics</h1>
      <h2>Kudos by Type</h2>
      <ul>
        {analytics.kudosByType.map(item => (
          <li key={item.type}>{item.type}: {item.count}</li>
        ))}
      </ul>
      <h2>Kudos by User</h2>
      <ul>
        {analytics.kudosByUser.map(item => (
          <li key={item.user}>{item.user}: Given - {item.given}, Received - {item.received}</li>
        ))}
      </ul>
      <Link to="/home">Back to Home</Link>
    </div>
  );
}

export default AnalyticsPage;

