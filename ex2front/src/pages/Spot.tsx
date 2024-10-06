import React, { useState } from 'react';

import StockList from '../components/StockList';
import ChartComponent from '../components/ChartComponent'; // Import the ChartComponent

interface Stock {
  id: number;
  name: string;
  price: number;
}

const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];

const Spot: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([
    { id: 1, name: 'FPGA', price: 145.23 },
    { id: 2, name: 'GPU', price: 675.50 },
    { id: 3, name: 'CPU', price: 3456.78 },
    { id: 4, name: 'DATA', price: 3456.78 },
  ]);

  const handleBuy = (id: number) => {
    alert(`Bought stock with id ${id}`);
    // Add logic for buying stock
  };

  const handleSell = (id: number) => {
    alert(`Sold stock with id ${id}`);
    // Add logic for selling stock
  };

  return (
    <div className="App">
      <h1 className="text-m font-bold" style={{ marginTop: '0px' }}>Purchase compute</h1>

      {/* Stock List */}
      <StockList stocks={stocks} onBuy={handleBuy} onSell={handleSell} />

      {/* Chart Component */}
    </div>
  );
};

export default Spot;
