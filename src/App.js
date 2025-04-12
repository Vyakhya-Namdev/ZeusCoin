import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage"; 
import CoinPage from "./pages/Coin";
import ComparePage from "./pages/ComparePage";
import WatchlistPage from "./pages/WatchlistPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/coin/:id" element={<CoinPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
