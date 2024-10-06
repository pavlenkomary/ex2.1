// "use client";
// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";

// const MapComponent: React.FC = () => {
//   const mapContainer = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     mapboxgl.accessToken = "pk.eyJ1IjoiYmFsbDU1MDIiLCJhIjoiY20xd3d0ZjRxMHFhdTJxcjMxZWIyazg2cCJ9.uZb15ww4y2NDSytKdm9f3A"; // Replace with your actual access token

//     if (mapContainer.current) {
//       const map = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: "mapbox://styles/mapbox/dark-v11",
//         center: [-74.006, 40.7128], // Center on New York
//         zoom: 5,
//       });

//       // Add zoom controls
//       map.addControl(new mapboxgl.NavigationControl(), "top-left");

//       // Add a marker
//       new mapboxgl.Marker()
//         .setLngLat([-74.006, 40.7128]) // Set marker position
//         .addTo(map);

//       // Clean up on unmount
//       return () => map.remove();
//     }
//   }, []);

//   return (
//     <div
//       ref={mapContainer}
//       style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
//     />
//   );
// };

// export default MapComponent;



"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

interface Vessel {
  id: number;
  name: string;
  coordinates: number[];
  path: VesselFeature[];
}

interface VesselFeatureProperties {
  name: string;
}

interface VesselFeature
  extends GeoJSON.Feature<GeoJSON.Point, VesselFeatureProperties> {}

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const blackCircleRadius = 10; // Initial radius for the blue circle
  const edgeThickness = 4; // Thickness for the white edge

  const vessels: Vessel[] = [
    {
      id: 1,
      name: "Vessel 1",
      coordinates: [-51.5185, 0.0859],
      path: [],
    },
    { id: 2, name: "Vessel 2", coordinates: [-51.5185, 0.0859], path: [] },
    // { id: 3, name: "Vessel 3", coordinates: [-73.9, 40.6], path: [] },
    // { id: 4, name: "Vessel 4", coordinates: [-73.5, 40.4], path: [] },
  ];

  const generateRandomPoints = (numPoints: number) => {
    const points = [];
    const bounds = [-54, 0.1, -73.7, 41]; // Bounding box (minLon, minLat, maxLon, maxLat)

    // Generate random points for red circles
    for (let i = 0; i < numPoints; i++) {
      const lon = bounds[0] + Math.random() * (bounds[2] - bounds[0]);
      const lat = bounds[1] + Math.random() * (bounds[3] - bounds[1]);
      const radius = 5 + Math.random() * 35; // Random radius between 5 and 40
      points.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lon, lat],
        },
        properties: {
          radius: radius, // Save the radius in properties
        },
      });
    }

    // Generate a single small blue circle
    const lon = bounds[0] + Math.random() * (bounds[2] - bounds[0]);
    const lat = bounds[1] + Math.random() * (bounds[3] - bounds[1]);
    points.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lon, lat],
      },
      properties: {
        radius: blackCircleRadius, // Fixed radius for the blue circle
        isBlack: true, // Indicate that this circle is black
      },
    });

    return points;
  };

  const getColorByRadius = (radius: number, isBlack: boolean) => {
    if (isBlack) return 'rgba(0, 0, 255, 1)'; // Return solid blue for the blue circle

    // Determine color based on radius for red circles
    const colorValue = Math.floor(255 - (radius * 5)); // Darker color for larger radius
    return `rgba(${colorValue}, 0, 0, 1)`; // RGB format for red
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibG91aXN5b29uZyIsImEiOiJjbHJ1MTdzNGwwNXU4MmlvM2x4d2gzd2dnIn0.Kuz52xD-JDk8XzFlmYPLfw";

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-5.5, -13.1],
        zoom: 5,
        maxZoom: 15,
      });

      // Add zoom controls
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      map.on("style.load", () => {
        try {
          vessels.forEach((vessel) => {
            // Add vessel point source and layer as before...

            // Initialize vessel path...
          });

          // Generate fewer random red points (e.g., 30 points)
          const randomPoints = generateRandomPoints(15);
          map.addSource("random-points-source", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: randomPoints,
            },
          });

          // Layer for the white edge around the blue circle
          map.addLayer({
            id: "random-points-white-edge-layer",
            type: "circle",
            source: "random-points-source",
            paint: {
              "circle-radius": [
                "case",
                ["==", ["get", "isBlack"], true], 
                [
                  "sum",
                  blackCircleRadius,
                  edgeThickness // Add thickness to radius for the edge layer
                ],
                [
                  "get",
                  "radius"
                ]
              ],
              "circle-color": "rgba(255, 255, 255, 1)", // White color for the edge
              "circle-opacity": 0.8,
            },
          });

          // Layer for the outer circle (darker edge)
          map.addLayer({
            id: "random-points-edge-layer",
            type: "circle",
            source: "random-points-source",
            paint: {
              "circle-radius": [
                "get",
                "radius"
              ],
              "circle-color": [
                "case",
                ["==", ["get", "isBlack"], true], "rgba(0, 0, 255, 1)", // Solid blue for the blue circle
                [
                  "case",
                  ["<", ["get", "radius"], 15], "rgba(255, 99, 71, 1)", // Light red for smaller radius
                  ["<", ["get", "radius"], 30], "rgba(220, 20, 60, 1)", // Medium red for medium radius
                  "rgba(139, 0, 0, 1)" // Dark red for larger radius
                ]
              ],
              "circle-opacity": 1,
            },
          });

          // Layer for the inner circle (light red fill)
          map.addLayer({
            id: "random-points-fill-layer",
            type: "circle",
            source: "random-points-source",
            paint: {
              "circle-radius": [
                "get",
                "radius"
              ],
              "circle-color": [
                "case",
                ["==", ["get", "isBlack"], true], "rgba(0, 0, 255, 1)", // Solid blue for the blue circle
                [
                  "case",
                  ["<", ["get", "radius"], 15], "rgba(255, 128, 128, 0.8)", // Light fill for smaller radius
                  ["<", ["get", "radius"], 30], "rgba(255, 99, 71, 0.8)", // Medium fill for medium radius
                  "rgba(220, 20, 60, 0.8)" // Dark fill for larger radius
                ]
              ],
              "circle-opacity": 0.8,
            },
          });

          // Throbbing effect for the blue circle
          const animateBlackCircle = () => {
            let increasing = true; // Flag to toggle between increasing and decreasing radius
            let currentRadius = blackCircleRadius;

            const throbbingInterval = setInterval(() => {
              if (increasing) {
                currentRadius += 0.023; // Increase radius
                if (currentRadius >= blackCircleRadius + 2) {
                  increasing = false; // Change direction
                }
              } else {
                currentRadius -= 0.023; // Decrease radius
                if (currentRadius <= blackCircleRadius) {
                  increasing = true; // Change direction
                }
              }

              // Update the blue circle's properties
              map.setPaintProperty("random-points-edge-layer", "circle-radius", [
                "case",
                ["==", ["get", "isBlack"], true], currentRadius, // Throbbing effect
                [
                  "get",
                  "radius"
                ]
              ]);

              map.setPaintProperty("random-points-fill-layer", "circle-radius", [
                "case",
                ["==", ["get", "isBlack"], true], currentRadius, // Throbbing effect
                [
                  "get",
                  "radius"
                ]
              ]);

              map.setPaintProperty("random-points-white-edge-layer", "circle-radius", [
                "case",
                ["==", ["get", "isBlack"], true], 
                [
                  "sum",
                  currentRadius,
                  edgeThickness // Add thickness to radius for the edge layer
                ],
                [
                  "get",
                  "radius"
                ]
              ]);
            }, 12); // Update every 100 milliseconds for faster throbbing effect

            return throbbingInterval; // Return the interval ID for cleanup
          };

          const throbbingInterval = animateBlackCircle();

          // Clean up on unmount
          return () => {
            clearInterval(throbbingInterval); // Clear the throbbing interval
            map.remove();
          };
        } catch (err) {
          console.error("Error adding layers or sources", err);
        }
      });
    }
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ position: "absolute", top: 250,left:0, bottom: 10, width: "100%", height:"70%" }}
    />
  );
};

export default MapComponent;