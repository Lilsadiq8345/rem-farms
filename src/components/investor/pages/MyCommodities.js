// src/components/investor/pages/MyCommodities.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyCommodities = () => {
  const [commodities, setCommodities] = useState([]);

  useEffect(() => {
    axios.get('/api/investor/commodities')
      .then(res => setCommodities(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>My Commodities</h2>
      <ul>
        {commodities.map(c => (
          <li key={c.id}>{c.name} - {c.status} - ${c.market_value}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyCommodities;
