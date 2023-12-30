import {Navigate, Outlet} from 'react-router-dom'
import {useEffect} from "react";
import {getFetch} from "./axios/fetcher.ts";
import useUser from "../zustand/userStore.tsx";

const PrivateRoutes = () => {
   const user = useUser()

   useEffect(() => {
      if (window.localStorage.getItem('token') && user.userID === '') {
         getFetch('/auth/getUser').then((response) => {
            console.log('Response' + JSON.stringify(response))
            user.setUser(response.userDetails)
         }).catch((error) => {
            console.log(error)
         })
         console.log('Rerender')
      }
   }, []);
   return (
       window.localStorage.getItem('token') ? <Outlet/> : <Navigate to='/login'/>
   )
}
export default PrivateRoutes;
