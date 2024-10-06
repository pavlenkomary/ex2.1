import React, { useState, useEffect } from 'react';
import ChartComponent from './ChartComponent'; // Import the ChartComponent

interface TechCompany {
  id: number; // Unique ID for each company
  name: string;
  price: number;
}

interface StockCardProps {
  name: string;
  price: number; // This price will be used for the latest price
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
    { id: 1, name: 'RTX 4090', price: 1600 },
    { id: 2, name: 'RX 7900 XTX', price: 1000 },
    { id: 3, name: 'RTX 4080', price: 1200 },
    { id: 4, name: 'RX 6800 XT', price: 800 },
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

  // Sort companies by price from lowest to highest
  const sortedCompanies = [...techCompanies].sort((a, b) => a.price - b.price);

  // Get the lowest price from the sorted list
  const lowestPrice = sortedCompanies.length > 0 ? sortedCompanies[0].price : 0;

  return (
    <div
      className="stock-card shadow-md overflow-hidden flex flex-col"
      style={{
        height: '380px', // Decreased height
        width: '250px',  // Same width
        backgroundColor: '#191a1c', // Set background color
        border: 'none', // Remove border
        borderRadius: '0px', // Remove rounded corners (if desired)
        padding: '20px', // Adjusted padding
      }}
    >
      <div className="mb-2">
        <h2 className="text-lg font-bold text-white">{name}</h2>
      </div>

        {/* Price Container */}
        <div 
        className="price-container" 
        style={{
            backgroundColor: '#333', // Match table cell background
            color: 'white',
            padding: '2px 0', // Decreased padding to reduce height (top/bottom padding only)
            textAlign: 'center',
            borderRadius: '5px',
            flexGrow: 1, // Make this container fill available space
            fontSize: '1rem', // Decreased font size to further reduce height
            fontWeight: 'bold', // Make text bold
        }}
        >
        <p className="text-gray-400">Price: {lowestPrice.toFixed(2)}</p> {/* Display lowest price */}
        </div>



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
                  padding: '3px',
                  backgroundColor: '#333',
                  color: 'white',
                  borderRadius: '5px', // Reduced curvature
                  width: '120px', // Static width for GPU names
                }}
              >
                GPU
              </th>
              <th
                style={{
                  padding: '5px',
                  backgroundColor: '#333',
                  color: 'white',
                  borderRadius: '5px', // Reduced curvature
                  width: '80px', // Static width for prices
                }}
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCompanies.map((company) => (
              <tr key={company.id}>
                <td
                  style={{
                    padding: '5px', // Adjusted padding
                    backgroundColor: '#333',
                    color: 'white',
                    borderRadius: '5px', // Reduced curvature
                    width: '120px', // Static width for GPU names
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
                    width: '80px', // Static width for prices
                  }}
                >
                  {company.price.toFixed(2)}
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



