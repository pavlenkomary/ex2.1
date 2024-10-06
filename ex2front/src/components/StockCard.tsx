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

  // State for chart data
  const [chartData, setChartData] = useState(initialData);
  
  // State for tech companies
  const [techCompanies, setTechCompanies] = useState<TechCompany[]>([
    { id: 1, name: 'Apple', price: 150 },
    { id: 2, name: 'Google', price: 150 },
    { id: 3, name: 'Microsoft', price: 150 },
    { id: 4, name: 'Amazon', price: 150 },
  ]);

  // Effect to add a random value every second for chart data
  useEffect(() => {
    const interval = setInterval(() => {
      const lastEntry = chartData[chartData.length - 1];
      const randomChange = Math.floor(Math.random() * 5) - 2; // Random change between -2 and +2
      const newValue = lastEntry.value + randomChange; // Update value
      const newTime = Date.now(); // Get current timestamp
      setChartData((prevData) => {
        // Create a new entry
        const newData = [...prevData, { time: newTime, value: newValue }];
        // Sort the data by time
        newData.sort((a, b) => a.time - b.time);
        return newData; // Return the sorted data
      });
    }, 1000); // Tick every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [chartData]);

  // Effect to update tech company prices every second
  useEffect(() => {
    const priceInterval = setInterval(() => {
      setTechCompanies((prevCompanies) =>
        prevCompanies.map((company) => ({
          ...company,
          price: parseFloat((company.price + (Math.random() > 0.5 ? 1 : -1)).toFixed(2)), // Random price change
        }))
      );
    }, 1000); // Update prices every second

    return () => clearInterval(priceInterval); // Cleanup on unmount
  }, []);

  // Function to handle buy
  const handleBuy = () => {
    const lastValue = chartData[chartData.length - 1].value;
    const newValue = lastValue + 2; // Increase by 2 for buy
    const newTime = Date.now(); // Get current timestamp
    setChartData((prevData) => [
      ...prevData,
      { time: newTime, value: newValue },
    ]);
    onBuy(); // Call the provided onBuy function
  };

  // Function to handle sell
  const handleSell = () => {
    const lastValue = chartData[chartData.length - 1].value;
    const newValue = lastValue - 2; // Decrease by 2 for sell
    const newTime = Date.now(); // Get current timestamp
    setChartData((prevData) => [
      ...prevData,
      { time: newTime, value: newValue },
    ]);
    onSell(); // Call the provided onSell function
  };

  // Get the latest price from the chart data
  const latestPrice = chartData[chartData.length - 1].value; // Last value in the data array

  return (
    <div 
      className="stock-card border p-2 rounded-lg shadow-md overflow-hidden flex flex-col"
      style={{
        height: '300', // Adjust height
        width: '300px',  // Adjust width
      }}>
      
      <div className="mb-2"> {/* Removed text-center */}
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-400 text-sm">Price: ${price.toFixed(2)}</p>
      </div>

      {/* Chart Component with Borders */}

      {/* Display the latest price below the chart */}
      <p className="text-gray-100 font-semibold mb-2 text-sm text-center">Latest Price: ${latestPrice.toFixed(2)}</p>

      {/* Tech Companies Table */}
      <div className="w-full flex justify-center"> {/* Center the table */}
        <table 
          className="table-auto border-collapse" // Removed text-center
          style={{
            width: '50%', // Full width
          }}>
          <thead>
            <tr>
              <th 
                style={{
                  padding: '5px', // Padding for header
                  backgroundColor: '#333', // Dark gray background
                  color: 'white', // White text for contrast
                  borderRadius: '10px', // Rounded corners
                }}>Company</th>
              <th 
                style={{
                  padding: '5px', // Padding for header
                  backgroundColor: '#333', // Dark gray background
                  color: 'white', // White text for contrast
                  borderRadius: '10px', // Rounded corners
                }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {techCompanies.map((company) => (
              <tr key={company.id}> {/* Use the unique id as the key */}
                <td 
                  style={{
                    padding: '8px', // Padding for cells
                    backgroundColor: '#333', // Dark gray background for cells
                    color: 'white', // White text for contrast
                    borderRadius: '10px', // Rounded corners for cells
                  }}>{company.name}</td>
                <td 
                  style={{
                    padding: '8px', // Padding for cells
                    backgroundColor: '#333', // Dark gray background for cells
                    color: 'white', // White text for contrast
                    borderRadius: '10px', // Rounded corners for cells
                  }}>${company.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buy and Sell buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '5px' }}> {/* Keep buttons centered */}
        <button 
          style={{
            backgroundColor: '#4CAF50', // Softer green
            color: 'white',
            padding: '8px 20px', // Reduced padding
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            fontSize: '0.9rem' // Smaller font size
          }} 
          onClick={handleBuy}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#66BB6A'} // Lighter green on hover
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'} // Reset to original color
        >
          Buy
        </button>
        <button 
          style={{
            backgroundColor: '#F44336', // Softer red
            color: 'white',
            padding: '8px 20px', // Reduced padding
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            fontSize: '0.9rem' // Smaller font size
          }} 
          onClick={handleSell}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EF5350'} // Lighter red on hover
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F44336'} // Reset to original color
        >
          Sell
        </button>
      </div>
    </div>
  );
};

export default StockCard;
