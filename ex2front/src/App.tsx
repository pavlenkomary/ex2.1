import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Futures from "./pages/Futures"; // Updated path to Futures page
import Spot from "./pages/Spot"; // Updated path
import YourCompute from "./pages/YourCompute"; // Updated path
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Header with navigation */}
        <nav style={{
            backgroundColor: '#1E1E2F', // Change to your preferred background color
            padding: '1rem',
            width: '100%', // Ensure the header spans the full width
            position: 'fixed', // Optional: keeps the header fixed at the top
            top: 0, // Optional: aligns the header to the top
            zIndex: 1000, // Optional: ensures the header stays above other content
            left:0
          }}>
          <ul style={{
            display: "flex",
            justifyContent: "space-around", // Equally spread out items
            alignItems: "center", // Center items vertically
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontSize: "1.5rem", // Larger font size
            color: '#FFFFFF', // Change text color if needed,
            left:0
          }}>
            <li>
              <Link to="/spot">Spot</Link>
            </li>
            <li>
              <Link to="/futures">Futures</Link>
            </li>
            <li>
              <Link to="/your-compute">Your Compute</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/spot" element={<Spot />} />
          <Route path="/futures" element={<Futures />} />
          <Route path="/your-compute" element={<YourCompute />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
