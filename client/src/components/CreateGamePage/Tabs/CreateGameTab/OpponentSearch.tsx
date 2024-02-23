import {FC, useEffect, useRef, useState} from "react";
import useClickOutside from "../../../../hooks/useClickOutside.tsx";
import ProfileIcon from "../../../Generic/ProfileIcon.tsx";
import useUser from "../../../../zustand/userStore.tsx";
import {postFetch} from "../../../../utils/axios/fetcher.ts";
import {UserFriend} from "../../../../types.ts";
import debounce from "lodash.debounce";
import {useLocation} from "react-router-dom";

interface OpponentSearchProps {
   chosenOpponent: UserFriend | null;
   setChosenOpponent: (opponent: UserFriend | null) => void;
}

const OpponentSearch: FC<OpponentSearchProps> = ({chosenOpponent, setChosenOpponent}) => {
   const [searchValue, setSearchValue] = useState<string>('');
   const [users, setUsers] = useState<UserFriend[]>([])
   const [isOpen, setIsOpen] = useState(false)
   const location = useLocation()
   const user = useUser()

   const dropdownRef = useRef(undefined);
   const inputRef = useRef(null);


   useClickOutside(dropdownRef, () => {
      setIsOpen(false);
   });

   const debouncedSearch = debounce((text) => {
      setSearchValue(text);
   }, 500);

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      debouncedSearch(e.target.value);
   }

   const handleChooseOpponent = (opponent) => {
      if (inputRef.current) {
         inputRef.current.value = '';
      }
      setChosenOpponent(opponent)
   };


   useEffect(() => {
      if (searchValue === '') {
         setUsers(user.friends)
      } else {
         postFetch('/friend-invitation/find', {searchedName: searchValue})
             .then((response) => {
                console.log(response)
                setUsers([response.friends, response.users].flat().map(item => (Array.isArray(item) ? item[0] : item)))
             })
             .catch((error) => {
                console.log(error)
             })
      }
   }, [searchValue]);


   useEffect(() => {
      setUsers(user.friends)
      if (location.state?.gameOpponent ?? false) {
         setChosenOpponent(location.state?.gameOpponent)
      }
   }, []);


   return (
       <div className={'relative'} ref={dropdownRef}>
          <div
              className={`flex gap-3 items-center  cursor-pointer select-none justify-between h-10 sm:h-12 ${searchValue.length > 0 ? 'rounded-t-lg ' : 'rounded-lg'} bg-primaryLight`}>

             <div className="relative w-full">

                {
                   chosenOpponent === null ?
                       (
                           <svg className="absolute left-2 top-2 fill-white h-8 w-8" viewBox="0 0 24 24" role="img">
                              <path fillRule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                    clipRule="evenodd"/>
                           </svg>
                       ) : (
                           <div
                               className={`absolute left-2 top-2 h-[32px] w-[32px] flex items-center justify-center text-lg bg-primary rounded-full`}>
                              {chosenOpponent.username[0]}
                           </div>
                       )
                }

                <input
                    type="text"
                    ref={inputRef}
                    onChange={handleChange}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => {
                       setIsOpen(false)
                       if (inputRef.current && chosenOpponent !== null) {
                          inputRef.current.value = ''; // Clear the input value
                       }
                    }}
                    placeholder={chosenOpponent !== null ? chosenOpponent.username : 'Search username'}
                    className={`bg-primaryLight w-full  outline-none text-[#ffffffd9] ${chosenOpponent !== null ? 'placeholder-white' : 'placeholder-[#ffffff80]'}   pl-12 pr-5  py-3 rounded-lg mr-10 `}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     onClick={() => setChosenOpponent(null)}
                     className={`absolute right-2 top-2 fill-white h-8 w-8 stroke-primaryLight ${chosenOpponent === null ? 'hidden' : 'block'}`}>
                   <path strokeLinecap="round" strokeLinejoin="round"
                         d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>

             </div>
             {/*Dropdown Options*/}
             <div
                 className={`absolute z-10 right-0 top-10  ${isOpen ? "  opacity-100 visible" : " opacity-0 invisible "} ${users?.length > 0 ? 'pt-4' : ''}  transition-all duration-300  rounded-b-lg select-none w-full bg-primaryLight  space-y-1`}>
                {users.slice(0, 5).map((opponent, index) => (
                    <div
                        onClick={() => handleChooseOpponent(opponent)}
                        className={'flex bg-primaryLight items-center gap-2 hover:bg-secondaryGreen text-white cursor-pointer h-12 px-2 rounded-sm'}>
                       <ProfileIcon size={'sm'} withText={true} isMyProfile={false} textValue={opponent.username}
                                    textStyles={'max-w-[143px] truncate'} bgColor={'#2A3033'}
                                    iconStyles={'h-[32px] w-[32px] text-lg'}/>
                       <span className={'ml-auto'}>{opponent.rating}</span>
                    </div>
                ))}

             </div>
          </div>
       </div>

   );
};

export default OpponentSearch;
