import {FC, useMemo, useState} from "react";
import FormInput from "../Forms/FormInput.tsx";
import {postFetch} from "../../utils/axios/fetcher.ts";
import {useNavigate} from "react-router-dom";
import useToast, {ToastPositions, ToastType} from "../../zustand/toastModalStore.tsx";

interface CreateClubModalProps {
   modalIsOpen: boolean;
   setModalIsOpen: (isOpen : boolean) => void;
}

const CreateClubModal:FC<CreateClubModalProps> = ({modalIsOpen, setModalIsOpen}) => {

   const [clubname, setClubname] = useState('')
   const [description, setDescription] = useState('')
   const navigate = useNavigate()
   const {openToast} = useToast()

   const disabled: boolean = useMemo(() => {
         return clubname === '' || description === ''
   }, [clubname, description])

   const handleClose = () => {
      setModalIsOpen(false)
      setClubname('')
      setDescription('')
   }
   const handleCreate = () => {
      postFetch('clubs/create',{
         clubname,
         description,
      })
      .then((response) => {
         navigate(`/club/${response.club._id}`)
         handleClose()
      })
      .catch((error) => {
         openToast({message: error.response.data, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 2500})
      })
   }



   return (
       <div
           className={`flex items-center justify-center cartPage:items-end fixed inset-0 z-20 transition-all duration-300 ${modalIsOpen ? "visible" : "invisible opacity-0"}`}>
          <div
              className={`absolute inset-0 z-30 bg-[rgba(111,111,111,0.5)] transition-all duration-300 h-full w-full ${modalIsOpen ? "visible" : "invisible opacity-0"}`}
              onClick={handleClose}/>

          <div
              className={`relative z-30 w-[400px] mx-2  py-4 px-4 sm:p-6 bg-primary ${clubname} rounded-lg  transition-all  duration-300 ${modalIsOpen ? "translate-y-0 scale-100" : "-translate-y-16 opacity-0 scale-50"}`}>



             <div className={'flex flex-col'}>
                {/* Body */}
                <div className={'flex flex-col'}>
                   <span className={'text-lg sm:text-xl text-center mt-1 mb-8'}>Create Club Form</span>

                   <FormInput placeholder={'Club Name'} value={clubname}
                              onChange={(text) => setClubname(text)} containerStyles={'sm:mx-1 mb-5'} labelStyles={'bg-primary'}  />
                   <FormInput placeholder={'Description'} value={description}
                               onChange={(text) => setDescription(text)} containerStyles={'sm:mx-1 mb-5'} labelStyles={'bg-primary'}  />

                </div>


                {/* Footer */}
                <div className={'flex justify-between mt-0 sm:mt-5'}>
                   <button
                       className={`text-lg sm:text-xl font-extrabold h-10 sm:h-12 w-full mx-1  ${disabled ? 'bg-primaryLight cursor-not-allowed' : 'bg-primaryGreen'} rounded-md mb-5  cursor-pointer`}
                       disabled={disabled} onClick={handleCreate}>Create Club
                   </button>
                </div>
             </div>
          </div>
       </div>
   );
};

export default CreateClubModal;
