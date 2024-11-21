// src/components/CommodityList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommodityList = () => {
  const [commodities, setCommodities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const response = await axios.get('https://rem-farms.onrender.com/api/commodities');
        console.log(response.data);
        setCommodities(response.data.commodities || response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching commodities:', error);
        setError('Error fetching commodities');
        setLoading(false);
      }
    };

    fetchCommodities();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading commodities...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Available Commodities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {commodities.map((commodity) => (
          <div key={commodity.COMMODITY_ID} className="bg-white p-4 shadow-lg rounded-lg">
            <img
              src={commodity.IMAGE_URL}
              alt={commodity.NAME}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{commodity.NAME}</h3>
            <p className="text-sm text-gray-600">Category: {commodity.CATEGORY}</p>
            <p className="text-sm text-gray-600">Description: {commodity.DESCRIPTION}</p>
            <p className="text-lg font-semibold text-green-600 mt-2">${commodity.PRICE}</p>
            <p className="text-sm text-gray-600">Available: {commodity.QUANTITY}</p>
            <p className="text-sm text-gray-500">Status: {commodity.STATUS}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommodityList;
