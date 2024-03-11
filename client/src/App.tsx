import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import Home from "./pages/Home/Home.tsx";
import ToastNotification from "./components/Modals/ToastNotification.tsx";
import Header from "./components/Header/Header.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import CreateGame from "./pages/CreateGame/CreateGame.tsx";
import PrivateRoutes from "./utils/PrivateRoutes.tsx";
import Friends from "./pages/Friends/Friends.tsx";
import Clubs from "./pages/Clubs/Clubs.tsx";
import Club from "./pages/Clubs/Club.tsx";
import Training from "./pages/Training/Training.tsx";
import Play from "./pages/Play/Play.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import {io} from "socket.io-client";
import {useEffect} from "react";
import {connectWithSocketServer} from "./websockets/socketConnection.ts";

function App() {

   useEffect(() => {
      const token = localStorage.getItem('token')
      if (token !== undefined && token !== '') {
         connectWithSocketServer(token)
      }
   }, []);

   return (
       <div className={'flex flex-col h-screen w-full overflow-x-hidden bg-mainBg'}>
          <Header/>
          <div className={'sm:w-[86%] sm:mx-auto'}>
             <Routes>

                {/* Private Routes */}
                <Route element={<PrivateRoutes/>}>
                   <Route path="/" element={<Navigate to="/home" replace/>}/>
                   <Route path="/home" element={<Home/>}/>
                   <Route path="/create-game" element={<CreateGame/>}/>
                   <Route path="/play/:id" element={<Play/>}/>
                   <Route path="/training" element={<Training/>}/>
                   <Route path="/friends" element={<Friends/>}/>
                   <Route path="/profile/:id" element={<Profile/>}/>
                   <Route path="/clubs" element={<Clubs/>}/>
                   <Route path="/club/:id" element={<Club/>}/>
                </Route>

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
