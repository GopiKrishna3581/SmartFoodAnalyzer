import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import your pages
import FoodAnalyzerPage from './components/FoodAnalyzerPage';
import Home from './components/Home';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<FoodAnalyzerPage />} />
        <Route path="/home" element={<Home /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;