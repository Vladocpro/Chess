import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";

const Home = () => {

   const navigate = useNavigate();

   useEffect(() => {
      if(!localStorage.getItem("token")) {
         navigate('/login')
      }
   }, []);

   return (
       <div>
         <Sidebar/>

       </div>
   );
};

export default Home;
