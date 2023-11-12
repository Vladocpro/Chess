import React, { useState } from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import Home from "./pages/Home/Home.tsx";
import ToastNotification from "./components/Generic/ToastNotification.tsx";
import Topbar from "./components/Topbar/Topbar.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";


function App() {
  return (
      <div className={'flex flex-col h-full w-full overflow-x-hidden bg-lightDark'}>
         <Topbar/>
         <div>
            <Routes>
               <Route path="/" element={<Navigate to="/home" replace />}/>
               <Route path="/home" element={<Home />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/register" element={<RegisterPage />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
         <ToastNotification/>
      </div>

  )
}

export default App
