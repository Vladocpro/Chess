// @ts-nocheck
import {useEffect} from "react";

function useClickOutside(ref, onClickOutside) {
   useEffect(() => {
      function handleClickOutside(event) {
         if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside();
         }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         // dispose
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [ref, onClickOutside]);
}

export default useClickOutside;
