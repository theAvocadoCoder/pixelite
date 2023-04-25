// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import WorkBench from './pages/WorkBench/WorkBench'
import Navbar from './components/Navbar/Navbar'
import { useEffect } from 'react'

function App() {


  useEffect(() => {
    const userInfo = {
      username: "user001",
      projects: [
        {
          name: "los angeles",
          tiles: [
            "#f0f0ff", "#fff0ff", "#fff0f0", "#f0f0f0", "#fffff0", "#f0fff0", "#f0ffff", "#ffffff",
            "#0000f0", "#0f00f0", "#000ff0", "#0f0ff0", "#0f0fff", "#0000ff", "#0f00ff", "#000fff",
            "#00f0ff", "#00f0f0", "#0ff0ff", "#0ffff0", "#00ffff", "#0fffff", "#0ff0f0", "#00fff0",
            "#00f000", "#0fff00", "#00ff00", "#0ff000", "#00ff0f", "#00f00f", "#0ff00f", "#0fff0f",
            "#fff00f", "#f0ff00", "#f0ff0f", "#ffff00", "#f0f000", "#ffff0f", "#f0f00f", "#fff000",
            "#ff0f0f", "#ff000f", "#f00000", "#f00f0f", "#f00f00", "#ff0000", "#ff0f00", "#f0000f",
            "#ff00f0", "#ff0fff", "#ff00ff", "#f000f0", "#f00ff0", "#f00fff", "#f000ff", "#ff0ff0",
            "#0f0f0f", "#000f0f", "#0f0000", "#0f000f", "#0f0f00", "#000f00", "#00000f", "#000000",          
          ]
        },
        {
          name: "la maria",
          tiles: [
            "#f0f0ff", "#fff0ff", "#fff0f0", "#f0f0f0", "#fffff0", "#f0fff0", "#f0ffff", "#ffffff",
            "#0000f0", "#0f00f0", "#000ff0", "#0f0ff0", "#0f0fff", "#0000ff", "#0f00ff", "#000fff",
            "#00f0ff", "#00f0f0", "#0ff0ff", "#0ffff0", "#00ffff", "#0fffff", "#0ff0f0", "#00fff0",
            "#00f000", "#0fff00", "#00ff00", "#0ff000", "#00ff0f", "#00f00f", "#0ff00f", "#0fff0f",
            "#fff00f", "#f0ff00", "#f0ff0f", "#ffff00", "#f0f000", "#ffff0f", "#f0f00f", "#fff000",
            "#ff0f0f", "#ff000f", "#f00000", "#f00f0f", "#f00f00", "#ff0000", "#ff0f00", "#f0000f",
            "#ff00f0", "#ff0fff", "#ff00ff", "#f000f0", "#f00ff0", "#f00fff", "#f000ff", "#ff0ff0",
            "#0f0f0f", "#000f0f", "#0f0000", "#0f000f", "#0f0f00", "#000f00", "#00000f", "#000000",          
          ]
        },
        {
          name: "el salvador",
          tiles: [
            "#f0f0ff", "#fff0ff", "#fff0f0", "#f0f0f0", "#fffff0", "#f0fff0", "#f0ffff", "#ffffff",
            "#0000f0", "#0f00f0", "#000ff0", "#0f0ff0", "#0f0fff", "#0000ff", "#0f00ff", "#000fff",
            "#00f0ff", "#00f0f0", "#0ff0ff", "#0ffff0", "#00ffff", "#0fffff", "#0ff0f0", "#00fff0",
            "#00f000", "#0fff00", "#00ff00", "#0ff000", "#00ff0f", "#00f00f", "#0ff00f", "#0fff0f",
            "#fff00f", "#f0ff00", "#f0ff0f", "#ffff00", "#f0f000", "#ffff0f", "#f0f00f", "#fff000",
            "#ff0f0f", "#ff000f", "#f00000", "#f00f0f", "#f00f00", "#ff0000", "#ff0f00", "#f0000f",
            "#ff00f0", "#ff0fff", "#ff00ff", "#f000f0", "#f00ff0", "#f00fff", "#f000ff", "#ff0ff0",
            "#0f0f0f", "#000f0f", "#0f0000", "#0f000f", "#0f0f00", "#000f00", "#00000f", "#000000",          
          ]
        }
      ]
    }
    localStorage.setItem("user", JSON.stringify(userInfo));
  }, [])

  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/:projectId" element={<WorkBench />} />
          <Route path="/edit/untitled" element={<WorkBench />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
