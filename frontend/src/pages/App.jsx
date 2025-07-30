
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Browse from './Browse';
import Dashboard from './Dashboard';
import CreateListing from './CreateListing';
import Profile from './Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-listing" element={<CreateListing />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
}
