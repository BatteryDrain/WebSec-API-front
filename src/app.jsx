import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "@/pages/home";
import Feed from "@/pages/feed";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </>
  )
}

export default App