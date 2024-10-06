// // src/components/MapComponent.tsx

// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// interface MapComponentProps {
//   accessToken: string;
//   center?: [number, number];
//   zoom?: number;
// }

// const MapComponent: React.FC<MapComponentProps> = ({ accessToken, center = [-74.5, 40], zoom = 9 }) => {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);

//   useEffect(() => {
//     if (mapRef.current) return; // If map already initialized, do nothing

//     mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsbDU1MDIiLCJhIjoiY20xd3d0ZjRxMHFhdTJxcjMxZWIyazg2cCJ9.uZb15ww4y2NDSytKdm9f3A';

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current as HTMLElement,
//       style: 'mapbox://styles/mapbox/streets-v11', // Choose your desired style
//       center: center, // starting position [lng, lat]
//       zoom: zoom // starting zoom
//     });

//     // Clean up on unmount
//     return () => mapRef.current?.remove();
//   }, [accessToken, center, zoom]);

//   return (
//     <div
//       ref={mapContainerRef}
//       style={{ height: '100%', width: '100%' }} // Ensure the map takes full height and width
//       className="map-container"
//     />
//   );
// };

// export default MapComponentw;



  