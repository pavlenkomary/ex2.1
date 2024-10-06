import React from 'react';
import StockCard from './StockCard'; // Ensure this imports the correct default export

interface Stock {
  id: number;
  name: string;
  price: number;
}

interface StockListProps {
  stocks: Stock[];
  onBuy: (id: number) => void;
  onSell: (id: number) => void;
}

const StockList: React.FC<StockListProps> = ({ stocks, onBuy, onSell }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 3fr)', // Fit 4 cards horizontally
        gap: '16px', // Space between cards
        padding: '10px', // Padding around the grid
      }}
    >
      {stocks.map(stock => (
        <div
          key={stock.id} // Key for each stock card
          style={{
            borderRadius: '12px', // Rounded corners
            overflow: 'hidden', // Hide overflow to maintain rounded corners
            border: '1px solid black', // Hard line border
          }}
        >
          <StockCard
            id={stock.id} // Ensure the id is passed to StockCard
            name={stock.name}
            price={stock.price}
            onBuy={() => onBuy(stock.id)}
            onSell={() => onSell(stock.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default StockList;
