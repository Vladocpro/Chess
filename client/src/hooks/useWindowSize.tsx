import {useState, useEffect} from "react";

function getBreakPoint(windowWidth: number) {
   if (windowWidth) {
      if (windowWidth < 640) {
         return "xs";
      } else if (windowWidth < 768) {
         return "sm";
      } else if (windowWidth < 1024) {
         return "md";
      } else if (windowWidth < 1280) {
         return "lg";
      } else {
         return "xl";
      }
   } else {
      return undefined;
   }
}

function useWindowSize() {
   const isWindowClient = typeof window === "object";

   const [windowSize, setWindowSize] = useState(
       isWindowClient
           ? getBreakPoint(window.innerWidth) //👈
           : undefined
   );

   useEffect(() => {
      //a handler which will be called on change of the screen resize
      function setSize() {
         setWindowSize(getBreakPoint(window.innerWidth));
      }

      if (isWindowClient) {
         //register the window resize listener
         window.addEventListener("resize", setSize);

         //unregister the listerner on destroy of the hook
         return () => window.removeEventListener("resize", setSize);
      }
   }, [isWindowClient, setWindowSize]);

   return windowSize;
}

export default useWindowSize;
