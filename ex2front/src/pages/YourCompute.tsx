// src/pages/MyCompute.tsx

import React from 'react';
import MapComponent from '../components/MapComponent'; // Import the MapComponent

const MyCompute: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        height: '100vh', // Full viewport height
        margin: 0, // Remove default margin
      }}
    >
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Data Center Availability</h1> {/* Centered text */}
      <div style={{ height: '500px', width: '100%', maxWidth: '800px' }}> {/* Container for the map */}
        <MapComponent />
      </div>
    </div>
  );
};

export default MyCompute;

