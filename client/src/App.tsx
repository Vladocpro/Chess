import React, { useState } from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import Home from "./pages/Home/Home.tsx";
import ToastNotification from "./components/ToastNotification.tsx";


function App() {
  return (
      <div className={'relative bg-lightDark'}>
         <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/home" replace />}/>
         </Routes>
         <ToastNotification/>
      </div>

  )
}

export default App
