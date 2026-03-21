import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "@/pages/home";
import Feed from "@/pages/feed";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from './pages/dashboard';
import Admin from './pages/admin';
import OAuthSuccess from './pages/OAuth';
import './App.css' 

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
    </>
  )
}

export default App