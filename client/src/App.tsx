import React, {useEffect, useState} from 'react'
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import Home from "./pages/Home/Home.tsx";
import ToastNotification from "./components/Generic/ToastNotification.tsx";
import Header from "./components/Header/Header.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import useUser from "./zustand/userStore.tsx";
import {getFetch} from "./utils/axios/fetcher.ts";


function App() {

   const location = useLocation();
   const user = useUser()

   useEffect(() => {
      if (location.pathname !== '/login' && location.pathname !== '/register') {
         getFetch('/auth/getUser').then((response) => {
            user.setUser(response.userDetails)
         }).catch((error) => {
            console.log(error)
         })
      }
   }, []);

   return (
       <div className={'flex flex-col h-screen w-full overflow-x-hidden bg-mainBg'}>
          <Header/>
          <div className={'sm:w-[86%] sm:mx-auto'}>
             <Routes>
                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="*" element={<NotFound/>}/>
             </Routes>
          </div>
          <ToastNotification/>
       </div>

   )
}

export default App
