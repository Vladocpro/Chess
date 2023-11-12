import React, {useEffect, useState} from 'react';
import FormInput from "../../components/Forms/FormInput.tsx";
import useToast, {ToastPositions, ToastType} from "../../zustand/toastModalStore.tsx";
import {validateEmail, validatePassword, validateUsername} from "../../utils/validations.ts";
import {postFetch} from "../../utils/axios/fetcher.ts";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {

   const [username, setUsername] = useState<string>('')
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [usernameError, setUsernameError]  = useState<string>('')
   const [emailError, setEmailError]  = useState<string>('')
   const [passwordError, setPasswordError]  = useState<string>('')
   const navigate = useNavigate();
   const { openToast } = useToast();



   const changeEmail = (text : string) => {
      setEmail(text)
      if(validateEmail(text)) {
         if(emailError !== '') {
            setEmailError('')
         }
      } else {
         setEmailError('Please enter a valid email')
      }
   };
   const changePassword = (text : string) => {
      setPassword(text)
      if(validatePassword(text)) {
         if(passwordError !== '') {
            setPasswordError('')
         }
      } else {
         setPasswordError('Password should be from 6 to 25 characters!')
      }
   };
   const changeUsername = (text : string) => {
      setUsername(text)
      if(validateUsername(text)) {
         if(usernameError !== '') {
            setUsernameError('')
         }
      } else {
         setUsernameError('Username should be from 5 to 20 characters!')
      }
   };

   const isButtonDisabled = () : boolean => {
      return !(validatePassword(password) && validateEmail(email));
   }

   const navigateToLoginPage = () => {
      navigate('/login')
   }

   const handleRegister = async () => {
      postFetch("/auth/register",{username: username, email : email, password: password}).then((data) => {
         window.localStorage.setItem('token', data.userDetails.token)
         openToast({message: 'Authenticated', type: ToastType.SUCCESS, position: ToastPositions.AUTH})
         navigate('/home')
      }).catch((error) => {
         openToast({message: error.response.data, type: ToastType.ERROR, position: ToastPositions.AUTH})
         console.log(error)
      })
   }

   return (
       <div className={'flex flex-col justify-center items-center h-screen w-screen'}>
          <div className={'flex flex-col items-center w-full'}>

             {/*LOGO*/}
             <div className={'flex flex-row items-end mb-10'}>
                <svg  className={"w-11 h-11 sm:w-14 sm:h-14 align-middle fill-primaryGreen overflow-hidden"}  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                   <path d="M512 375.466667c-102.4 0-187.733333-85.333333-187.733333-187.733334S409.6 0 512 0s187.733333 85.333333 187.733333 187.733333S614.4 375.466667 512 375.466667z m0-341.333334c-85.333333 0-153.6 68.266667-153.6 153.6s68.266667 153.6 153.6 153.6 153.6-68.266667 153.6-153.6S597.333333 34.133333 512 34.133333z" fill="" /><path d="M512 477.866667c-136.533333 0-184.32-64.853333-184.32-68.266667-3.413333-3.413333-3.413333-6.826667-3.413333-10.24v-44.373333-6.826667c3.413333-3.413333 17.066667-27.306667 81.92-40.96 10.24-3.413333 17.066667 3.413333 20.48 13.653333 3.413333 10.24-3.413333 17.066667-13.653334 20.48-37.546667 6.826667-51.2 17.066667-54.613333 23.893334v30.72c10.24 10.24 54.613333 47.786667 153.6 47.786666s143.36-37.546667 153.6-47.786666v-30.72c-3.413333-3.413333-20.48-13.653333-54.613333-23.893334-10.24-3.413333-13.653333-10.24-13.653334-20.48s10.24-13.653333 20.48-13.653333c64.853333 13.653333 78.506667 37.546667 81.92 44.373333v51.2c0 3.413333 0 6.826667-3.413333 10.24 0 0-47.786667 64.853333-184.32 64.853334z" fill="" /><path d="M512 887.466667c-163.84 0-211.626667-51.2-218.453333-58.026667-3.413333-6.826667-6.826667-13.653333 0-20.48 0 0 98.986667-167.253333 98.986666-348.16 0-10.24 6.826667-17.066667 17.066667-17.066667s17.066667 6.826667 17.066667 17.066667c0 163.84-75.093333 310.613333-98.986667 354.986667 20.48 13.653333 71.68 37.546667 184.32 37.546666 112.64 0 163.84-23.893333 184.32-37.546666-23.893333-44.373333-98.986667-191.146667-98.986667-354.986667 0-10.24 6.826667-17.066667 17.066667-17.066667s17.066667 6.826667 17.066667 17.066667c0 184.32 98.986667 348.16 98.986666 348.16 3.413333 6.826667 3.413333 13.653333 0 20.48-6.826667 6.826667-54.613333 58.026667-218.453333 58.026667z" fill="" /><path d="M512 1024c-245.76 0-317.44-105.813333-320.853333-109.226667-3.413333-3.413333-3.413333-6.826667-3.413334-10.24V819.2c0-47.786667 95.573333-64.853333 133.12-68.266667 10.24 0 17.066667 6.826667 20.48 13.653334 0 10.24-6.826667 17.066667-13.653333 20.48-58.026667 6.826667-105.813333 27.306667-105.813333 34.133333v78.506667c13.653333 17.066667 92.16 92.16 290.133333 92.16s276.48-75.093333 290.133333-92.16V819.2c0-10.24-44.373333-27.306667-105.813333-34.133333-10.24 0-17.066667-10.24-13.653333-20.48 0-10.24 10.24-17.066667 20.48-13.653334 40.96 3.413333 133.12 20.48 133.12 68.266667v85.333333c0 3.413333 0 6.826667-3.413334 10.24-3.413333 3.413333-75.093333 109.226667-320.853333 109.226667zM409.6 204.8c-10.24 0-17.066667-6.826667-17.066667-17.066667C392.533333 122.88 447.146667 68.266667 512 68.266667c10.24 0 17.066667 6.826667 17.066667 17.066666s-6.826667 17.066667-17.066667 17.066667c-47.786667 0-85.333333 37.546667-85.333333 85.333333 0 10.24-6.826667 17.066667-17.066667 17.066667z" fill={"primaryGreen"} />
                </svg>
                <span className={'text-4xl sm:text-5xl'}>Chess</span>
             </div>

             {/*FORM*/}
             <div className={'flex flex-col text-center w-[20rem] sm:w-[28rem]  md:w-[35rem] shadow-xl  border-2 mx-2 border-secondaryDark bg-secondaryDark rounded-lg'}>
                <span className={'text-lg sm:text-xl mt-4 mb-8'}>Sign up Form</span>
                <FormInput placeholder={'Username'}  isError={usernameError !== ''} errorText={usernameError} onChange={changeUsername}   containerStyles={'mx-5 mb-5'}/>
                <FormInput placeholder={'Email'}  isError={emailError !== ''} errorText={emailError} onChange={changeEmail}   containerStyles={'mx-5 mb-5'}/>
                <FormInput placeholder={'Password'} type={'password'} isError={passwordError !== ''} errorText={passwordError} onChange={changePassword}   containerStyles={'mx-5 mb-8'}/>

                <button className={'text-lg sm:text-xl font-extrabold h-10 sm:h-12 w-40 sm:w-60 bg-primaryGreen rounded-md mb-5 mx-auto cursor-pointer'} disabled={isButtonDisabled()} onClick={handleRegister}>Sign up</button>
                <div className={'flex justify-center items-center text-center bg-secondaryDark  h-10 sm:h-12 w-full rounded-b-md cursor-pointer'} onClick={navigateToLoginPage}>
                   <span className={'text-sm sm:text-base text-primaryGreen drop-shadow-2xl rounded-sm w-full'}>Already have account ? Sign in</span>
                </div>
             </div>
          </div>
       </div>
   );
};

export default RegisterPage;
