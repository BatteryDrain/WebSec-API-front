import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Upload from "./pages/Upload";
import Home from "@/pages/home";
import Feed from "@/pages/feed";
import './App.css'

function App() {

  return (
    <>
      <Routes>
      <Route path="/upload" element={<Upload />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </>
  )
}

export default App
