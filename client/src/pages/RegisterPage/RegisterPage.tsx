import React, {useEffect, useState} from 'react';
import FormInput from "../../components/Forms/FormInput.tsx";
import useToast, {ToastPositions, ToastType} from "../../zustand/toastModalStore.tsx";
import {validateEmail, validatePassword, validateUsername} from "../../utils/validations.ts";
import {postFetch} from "../../utils/axios/fetcher.ts";
import {useNavigate} from "react-router-dom";
import Logo from "../../components/Generic/Logo.tsx";
import {COLORS} from "../../utils/constants/colors.ts";
import useUser from "../../zustand/userStore.tsx";

const RegisterPage = () => {

   const [username, setUsername] = useState<string>('')
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [usernameError, setUsernameError] = useState<string>('')
   const [emailError, setEmailError] = useState<string>('')
   const [passwordError, setPasswordError] = useState<string>('')
   const navigate = useNavigate();
   const {openToast} = useToast();
   const user = useUser()

   const changeEmail = (text: string) => {
      setEmail(text)
      if (validateEmail(text)) {
         if (emailError !== '') {
            setEmailError('')
         }
      } else {
         setEmailError('Please enter a valid email')
      }
   };
   const changePassword = (text: string) => {
      setPassword(text)
      if (validatePassword(text)) {
         if (passwordError !== '') {
            setPasswordError('')
         }
      } else {
         setPasswordError('Password should be from 6 to 25 characters!')
      }
   };
   const changeUsername = (text: string) => {
      setUsername(text)
      if (validateUsername(text)) {
         if (usernameError !== '') {
            setUsernameError('')
         }
      } else {
         setUsernameError('Username should be from 5 to 20 characters!')
      }
   };

   const isButtonDisabled = (): boolean => {
      return !(validatePassword(password) && validateEmail(email));
   }

   const navigateToLoginPage = () => {
      navigate('/login')
   }

   const handleRegister = async () => {
      postFetch("/auth/register", {username: username, email: email, password: password}).then((response) => {
         window.localStorage.setItem('token', response.token)
         user.setUser(response.userDetails)
         openToast({message: 'Authenticated', type: ToastType.SUCCESS, position: ToastPositions.AUTH, duration: 1000})
         navigate('/home')
      }).catch((error) => {
         openToast({message: error.response.data, type: ToastType.ERROR, position: ToastPositions.AUTH})
         console.log(error)
      })
   }

   return (
       <div className={'flex flex-col justify-center items-center h-screen w-full'}>
          <div className={'flex flex-col items-center w-full'}>

             {/*LOGO*/}
             <div className={'flex flex-row items-end mb-10'}>
                <Logo styles={'w-11 h-11 sm:w-14 sm:h-14'} fill={COLORS.primaryGreen}/>
                <span className={'text-4xl sm:text-5xl'}>Chess</span>
             </div>

             {/*FORM*/}
             <div
                 className={'flex flex-col text-center w-[20rem] sm:w-[28rem]  md:w-[35rem] shadow-xl  border-2 mx-2 bg-neutral-800 rounded-lg border-neutral-600'}>
                <span className={'text-lg sm:text-xl mt-4 mb-8'}>Sign up Form</span>
                <FormInput placeholder={'Username'} isError={usernameError !== ''} errorText={usernameError}
                           onChange={changeUsername} containerStyles={'mx-5 mb-5'}/>
                <FormInput placeholder={'Email'} isError={emailError !== ''} errorText={emailError}
                           onChange={changeEmail} containerStyles={'mx-5 mb-5'}/>
                <FormInput placeholder={'Password'} type={'password'} isError={passwordError !== ''}
                           errorText={passwordError} onChange={changePassword} containerStyles={'mx-5 mb-8'}/>

                <button
                    className={'text-lg sm:text-xl font-extrabold h-10 sm:h-12 w-40 sm:w-60 bg-primaryGreen rounded-md mb-5 mx-auto cursor-pointer'}
                    disabled={isButtonDisabled()} onClick={handleRegister}>Sign up
                </button>
                <div
                    className={'flex justify-center items-center text-center h-10 sm:h-12 w-full rounded-b-md cursor-pointer'}
                    onClick={navigateToLoginPage}>
                   <span className={'text-sm sm:text-base text-primaryGreen drop-shadow-2xl rounded-sm w-full'}>Already have account ? Sign in</span>
                </div>
             </div>
          </div>
       </div>
   );
};

export default RegisterPage;
