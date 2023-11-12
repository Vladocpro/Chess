import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Topbar from "../../components/Topbar/Topbar.tsx";

const Home = () => {

   const navigate = useNavigate();

   useEffect(() => {
      if(!localStorage.getItem("token")) {
         navigate('/login')
      }
   }, []);

   return (
       <div>

       </div>
   );
};

export default Home;
