// src/pages/MyCompute.tsx

import React from 'react';
import MapComponent from '../components/MapComponent'; // Import the MapComponent
import CenterCard from '../components/CenterCard'; // Import the CenterCard

const MyCompute: React.FC = () => {
  const gpuClusters = [
    {
      title: 'NVIDIA HQ',
      description: 'Located in Santa Clara, CA. High availability and low latency.',
      progress: Math.floor(Math.random() * 101), // Random progress between 0 and 100
    },
    {
      title: 'AMD Data Center',
      description: 'Available in Austin, TX. Advanced GPUs for heavy workloads.',
      progress: Math.floor(Math.random() * 101),
    },
    {
      title: 'Intel GPU Lab',
      description: 'Based in Hillsboro, OR. Cutting-edge GPU technologies.',
      progress: Math.floor(Math.random() * 101),
    },
    {
      title: 'Google Cloud',
      description: 'Distributed across multiple regions. Scalable and reliable.',
      progress: Math.floor(Math.random() * 101),
    },
    {
      title: 'Microsoft Azure',
      description: 'Global data centers with GPU capabilities for AI tasks.',
      progress: Math.floor(Math.random() * 101),
    },
    {
      title: 'IBM Cloud',
      description: 'Located in New York, NY. Focused on enterprise solutions.',
      progress: Math.floor(Math.random() * 101),
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Align items to the left
        height: '100vh', // Full viewport height
        margin: 0, // Remove default margin
      }}
    >
      <h1 style={{ 
        margin: '100px 0 20px 0', // Added top margin for buffer and adjusted bottom margin
        fontSize: '36px', // Decreased font size
        textAlign: 'left' // Ensure the text is aligned left
      }}>
        Data Center Availability
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {gpuClusters.map((cluster, index) => (
          <CenterCard
            key={index}
            title={cluster.title}
            description={cluster.description}
            progress={cluster.progress} // Pass the random progress
          />
        ))}
      </div>
      <div style={{ height: '500px', width: '100%', maxWidth: '800px', marginTop: '20px' }}>
        <MapComponent />
      </div>
    </div>
  );
};

export default MyCompute;

