
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Dashboard from './pages/Dashboard'
import CreateListing from './pages/CreateListing'
import Profile from './pages/Profile'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-listing" element={<CreateListing />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  </BrowserRouter>
)

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
