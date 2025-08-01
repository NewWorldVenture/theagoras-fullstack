
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Browse from './pages/browse';
import Dashboard from './pages/dashboard';
import CreateListing from './pages/create-listing';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/[id]';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to TheAgoras Marketplace</h1>} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/update-password" element={<UpdatePassword />} />
  <Route path="/seller/:sellerId" element={<SellerStorefront />} />
<Route path="/" element={<Home />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/profile" element={<Profile />} />
<Route path="/listing/:id" element={<ListingDetail />} />
</Routes>
    </Router>
  );
}

export default App;
