import {useState} from 'react';
import {Link} from "react-router-dom";
import {logout} from "../../utils/auth.ts";
import Logo from "../Generic/Logo.tsx";


const BurgerMenu = ({userID}) => {
   const [burgerVisible, setBurgerVisible] = useState<boolean>(false)


   return (
       <div className="block mr-5 sm:hidden">
          <div
              className="block relative  cursor-pointer z-20 sm:hidden  h-[18px] w-[24px]  after:top-[-9px] after:left-[-8px] after:h-[200%] after:w-[165%] space-y-1.5 "
              onClick={() => setBurgerVisible(!burgerVisible)}>
             <hr className={`headerBurgerLine ${burgerVisible && "rotate-45  translate-y-[8px] "}`}/>
             <hr className={`headerBurgerLine mx-auto ${burgerVisible ? "w-[1%]" : "w-[100%]"}`}/>
             <hr className={`headerBurgerLine ${burgerVisible && "rotate-[-45deg] translate-y-[-8px] "}`}/>
          </div>


          <div
              className={`absolute z-10 inset-0 transition-all duration-300 h-screen w-screen opacity-[45%] burgerBlockingLayer ${burgerVisible ? "visible" : "invisible opacity-0"}`}
              onClick={() => setBurgerVisible(!burgerVisible)}/>
          <div
              className={`fixed z-10 right-0 top-0 h-screen   transition-all duration-300 bg-header opacity-100  ${burgerVisible ? "w-screen visible" : "invisible"} h-full w-[0] space-y-1.5 `}>
             <div className="flex flex-col ml-10 mr-10 h-full text-left overflow-hidden text-2xl mt-16">

                <span className={'font-semibold'}>MAIN MENU</span>
                <Link to={"/home"} onClick={() => setBurgerVisible(false)}
                      className="headerBurgerLink mt-4">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                        className="headerSvg w-7 h-7">
                      <path
                          d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"/>
                      <path
                          d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"/>
                   </svg>

                   <span className={'font-medium'}>Home</span>

                </Link>
                <Link to={"/create-game"} onClick={() => setBurgerVisible(false)}
                      className="headerBurgerLink mt-3">
                   <img className={'headerSvg w-7 h-7'} src={'/board.png'}
                        alt={'chess club'}/>
                   <span className={'font-medium'}>Play</span>
                </Link>
                <Link to={"/friends"} onClick={() => setBurgerVisible(false)}
                      className="headerBurgerLink  mt-3">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        className="headerSvg w-7 h-7 fill-white">
                      <path
                          d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"/>
                   </svg>
                   <span className={'font-medium'}>Friends</span>
                </Link>
                <Link to={"/clubs"} onClick={() => setBurgerVisible(false)}
                      className="headerBurgerLink mt-3">
                   <img className={'headerSvg w-7 h-7'} src={'/club.png'}
                        alt={'chess club'}/>
                   <span className={'font-medium'}>Clubs</span>
                </Link>
                <Link to={`/profile/${userID}`} onClick={() => setBurgerVisible(false)}
                      className="headerBurgerLink mt-3">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                        className="headerSvg w-7 h-7">
                      <path fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            clipRule="evenodd"/>
                   </svg>

                   <span className={'font-medium'}>Profile</span>
                </Link>
                <hr className="h-[2.5px] rounded-md bg-black mt-5"/>
                <div className="headerBurgerLink mt-3" onClick={() => {
                   setBurgerVisible(false)
                   logout()
                }}>
                   <img className={'headerSvg w-7 h-7'} src={'/logout.png'}
                        alt={'Log Out'}/>
                   <span className={'font-medium'}>Log Out</span>
                </div>
             </div>
          </div>
       </div>
   );
};

export default BurgerMenu;
