import React, { useState, useEffect } from 'react';
import ChartComponent from './ChartComponent'; // Import the ChartComponent

interface TechCompany {
  id: number; // Unique ID for each company
  name: string;
  price: number;
}

interface StockCardProps {
  name: string;
  price: number;
  onBuy: () => void;
  onSell: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ name, price, onBuy, onSell }) => {
  // Initial chart data
  const initialData = [
    { time: Date.now() - 86400000, value: 50 }, // Example data for chart
  ];

  const [chartData, setChartData] = useState(initialData);
  const [techCompanies, setTechCompanies] = useState<TechCompany[]>([
    { id: 1, name: 'Apple', price: 150 },
    { id: 2, name: 'Google', price: 150 },
    { id: 3, name: 'Microsoft', price: 150 },
    { id: 4, name: 'Amazon', price: 150 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastEntry = chartData[chartData.length - 1];
      const randomChange = Math.floor(Math.random() * 5) - 2; // Random change between -2 and +2
      const newValue = lastEntry.value + randomChange; // Update value
      const newTime = Date.now(); // Get current timestamp
      setChartData((prevData) => {
        const newData = [...prevData, { time: newTime, value: newValue }];
        newData.sort((a, b) => a.time - b.time);
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [chartData]);

  useEffect(() => {
    const priceInterval = setInterval(() => {
      setTechCompanies((prevCompanies) =>
        prevCompanies.map((company) => ({
          ...company,
          price: parseFloat(
            (company.price + (Math.random() > 0.5 ? 1 : -1)).toFixed(2)
          ),
        }))
      );
    }, 1000);
    return () => clearInterval(priceInterval);
  }, []);

  const handleBuy = () => {
    const lastValue = chartData[chartData.length - 1].value;
    const newValue = lastValue + 2; 
    const newTime = Date.now();
    setChartData((prevData) => [
      ...prevData,
      { time: newTime, value: newValue },
    ]);
    onBuy();
  };

  const handleSell = () => {
    const lastValue = chartData[chartData.length - 1].value;
    const newValue = lastValue - 2; 
    const newTime = Date.now();
    setChartData((prevData) => [
      ...prevData,
      { time: newTime, value: newValue },
    ]);
    onSell();
  };

  const latestPrice = chartData[chartData.length - 1].value; 

  return (
    <div
      className="stock-card shadow-md overflow-hidden flex flex-col"
      style={{
        height: '400px', // Increased height
        width: '250px',  // Same width
        backgroundColor: '#191a1c', // Set background color
        border: 'none', // Remove border
        borderRadius: '0px', // Remove rounded corners (if desired)
        padding: '20px', // Adjusted padding
      }}
    >
      <div className="mb-2">
        <h2 className="text-lg font-bold text-white">{name}</h2>
        <p className="text-gray-400 text-sm">Price: ${price.toFixed(2)}</p>
      </div>

      <p className="text-gray-100 font-semibold mb-2 text-sm text-center">
        Latest Price: ${latestPrice.toFixed(2)}
      </p>

      <div className="w-full flex justify-center">
        <table
          className="table-auto border-collapse"
          style={{
            width: '100%', // Full width for table
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: '5px',
                  backgroundColor: '#333',
                  color: 'white',
                  borderRadius: '5px', // Reduced curvature
                }}
              >
                Company
              </th>
              <th
                style={{
                  padding: '5px',
                  backgroundColor: '#333',
                  color: 'white',
                  borderRadius: '5px', // Reduced curvature
                }}
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {techCompanies.map((company) => (
              <tr key={company.id}>
                <td
                  style={{
                    padding: '5px', // Adjusted padding
                    backgroundColor: '#333',
                    color: 'white',
                    borderRadius: '5px', // Reduced curvature
                  }}
                >
                  {company.name}
                </td>
                <td
                  style={{
                    padding: '5px', // Adjusted padding
                    backgroundColor: '#333',
                    color: 'white',
                    borderRadius: '5px', // Reduced curvature
                  }}
                >
                  ${company.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px', // Adjusted gap between buttons
          marginTop: '10px', // Adjusted margin
        }}
      >
        <button
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '8px 15px', // Adjusted padding for buttons
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            fontSize: '0.9rem',
          }}
          onClick={handleBuy}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#66BB6A')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
        >
          Buy
        </button>
        <button
          style={{
            backgroundColor: '#F44336',
            color: 'white',
            padding: '8px 15px', // Adjusted padding for buttons
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            fontSize: '0.9rem',
          }}
          onClick={handleSell}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EF5350')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F44336')}
        >
          Sell
        </button>
      </div>
    </div>
  );
};

export default StockCard;