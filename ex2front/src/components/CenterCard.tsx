// src/components/CenterCard.tsx

import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import the CSS for the circular progress bar

interface CenterCardProps {
  title: string;
  description: string;
  progress: number; // Add a progress prop
}

const CenterCard: React.FC<CenterCardProps> = ({ title, description, progress }) => {
  return (
    <div
      style={{
        backgroundColor: '#191a1c', // Background color matching the StockCard
        borderRadius: '8px', // Rounded corners
        padding: '15px', // Increased padding inside the card
        width: '150px', // Increased width for the card
        textAlign: 'center', // Center text inside the card
        margin: '10px', // Margin for spacing between cards
      }}
    >
      <div style={{ width: '70px', height: '70px', margin: '0 auto' }}>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={{
            path: { stroke: '#4CAF50' }, // Customize path color
            text: { fill: '#fff', fontSize: '16px' }, // Customize text color and size
            trail: { stroke: '#ddd' }, // Customize trail color
          }}
        />
      </div>
      <h3 style={{ color: 'white', margin: '10px 0 5px 0' }}>{title}</h3>
      <p style={{ color: 'gray', fontSize: '12px' }}>{description}</p>
    </div>
  );
};

export default CenterCard;
