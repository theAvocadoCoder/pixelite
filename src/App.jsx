// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import WorkBench from './pages/WorkBench'
import Navbar from './components/Navbar'
// import { useEffect } from 'react'
// import { randomColor, randomNumber } from './helpers'

function App() {


  // useEffect(() => {
  //   function randomArray() {
  //     let arr = [];
  //     let gridSize = randomNumber(1) * 4;
  //     if (gridSize == 0) gridSize = 64;
  //     for (let i = 0; i < gridSize * gridSize; i++) {
  //       arr.push(randomColor());
  //     }
  //     return arr;
  //   }
  //   const userInfo = {
  //     username: "user001",
  //     projects: [
  //       {
  //         name: "los angeles",
  //         tiles: randomArray()
  //       },
  //       {
  //         name: "la maria",
  //         tiles: randomArray()
  //       },
  //       {
  //         name: "el salvador",
  //         tiles: randomArray()
  //       },
  //       {
  //         name: "los universidades",
  //         tiles: randomArray()
  //       },
  //       {
  //         name: "la casa",
  //         tiles: randomArray()
  //       },
  //       {
  //         name: "el supermercado",
  //         tiles: randomArray()
  //       },
  //     ]
  //   }
  //   localStorage.setItem("user", JSON.stringify(userInfo));
  // }, [])

  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/:projectId" element={<WorkBench />} />
          <Route path="/new/:newProject" element={<WorkBench />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
