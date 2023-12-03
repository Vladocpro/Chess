import {useEffect} from "react";
import useToast from "../../zustand/toastModalStore.tsx";


function ToastNotification() {

   const toast = useToast();

   useEffect(() => {
      const timer = setTimeout(() => toast.closeToast(), toast.duration);
      return () => clearTimeout(timer);
   }, [toast.visible]);

   return (
       <div
           className={`fixed cursor-default z-30 ${toast.position} p-3 ${toast.type} text-white rounded-md transition-all duration-300 ${toast.visible ? "visible opacity-100 translate-y-0" : "-translate-y-8 opacity-0 invisible"}`}
           onClick={() => toast.closeToast()}
       >
          <p className="inline-block font-medium">{toast.message}</p>
       </div>
   );
}

export default ToastNotification
