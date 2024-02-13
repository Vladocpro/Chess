import SearchInput from "../../components/Generic/SearchInput.tsx";
import debounce from "lodash.debounce";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import CreateClubModal from "../../components/Modals/CreateClubModal.tsx";
import {getFetch} from "../../utils/axios/fetcher.ts";
import {IClub} from "../../types.ts";
import MyClub from "../../components/ClubPage/MyClub.tsx";

const Clubs = () => {

   const [searchValue, setSearchValue] = useState<string>("")
   const [popularClubs, setPopularClubs] = useState<IClub[] | []>([])
   const [filteredClubs, setFilteredClubs] = useState<IClub[] | []>([])
   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
   const [waiting, setWaiting] = useState<boolean>(true)


   const debouncedSearch = debounce((text) => {
      setSearchValue(text);
   }, 500);

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      debouncedSearch(e.target.value);
   }

   useEffect(() => {
      if (searchValue === '') {
         return;
      }
      getFetch(`/clubs/find/${searchValue}`)
          .then((response) => {
             setFilteredClubs(response.clubs)
          })
          .catch((error) => {
             console.log(error)
          })
   }, [searchValue]);

   useEffect(() => {
      getFetch('/clubs/getPopulars')
          .then((response) => {
             setPopularClubs(response.clubs)
             setWaiting(false)
          })
          .catch((error) => {
             console.log(error)
          })
   }, []);

   if (waiting) {
      return null
   }


   return (
       <div className={'flex gap-6 justify-center mt-0 sm:mt-10 mb-7'}>
          <div className={'bg-primary py-5 px-5 rounded-md flex-[2] max-w-[900px]'}>


             {/* Search */}
             <SearchInput onSearch={handleChange} placeholder={'Search by club name'}/>
             <div className={'flex items-center mt-7 mb-5 justify-between gap-2'}>
                <span
                    className={'text-primaryGreen text-sm sm:text-lg font-bold'}>Do you want to create your own club ?</span>
                <button onClick={() => setModalIsOpen(true)}
                        className={'text-sm sm:text-base bg-primaryLight hover:bg-secondaryGreen duration-200 rounded-md py-2 sm:py-3 px-4 sm:px-7 min-w-[145px]'}>Create
                   a Club
                </button>
             </div>

             <div className={'flex flex-col mt-2'}>

                <MyClub/>

                {
                   searchValue === ''
                       ? (
                           // Popular Clubs
                           <div>
                              <div className={'flex items-center gap-3 sm:gap-5 mb-1 '}>
                                 <span className={'font-bold text-base sm:text-xl py-2'}>Popular</span>
                                 <span
                                     className={'bg-input rounded-md text-sm sm:text-base px-1'}>{popularClubs.length} </span>
                              </div>
                              <div className={'flex flex-col gap-3'}>
                                 {popularClubs?.map((club) => (
                                     <div className={'flex items-center justify-between gap-5'} key={club._id}>
                                        <Link className={'flex flex-[1] items-center gap-2 sm:gap-5'}
                                              to={`/club/${club._id}`}>
                                           <img className={'w-[2.25rem] h-[2.25rem] sm:w-[3.75rem] sm:h-[3.75rem] '}
                                                src={'club.png'} alt={'chess club'}/>
                                           <div className={'flex flex-col'}>
                                              <span>{club.clubname}</span>
                                              <span
                                                  className={'text-sm hidden sm:inline-block'}>{club.membersCount} Members</span>
                                           </div>
                                        </Link>
                                     </div>
                                 ))}
                              </div>
                           </div>
                       )
                       : (
                           // Filtered clubs List
                           <div>
                              <div className={'flex items-center gap-3 sm:gap-5 mb-1 '}>
                                 <span className={'font-bold text-base sm:text-xl py-2'}>Suggested</span>
                                 <span
                                     className={'bg-input rounded-md text-sm sm:text-base px-1'}>{filteredClubs.length} </span>
                              </div>
                              <div className={'flex flex-col gap-3'}>
                                 {filteredClubs?.map((club) => (
                                     <div className={'flex items-center justify-between gap-5'} key={club._id}>
                                        <Link className={'flex flex-[1] items-center gap-2 sm:gap-5'}
                                              to={`/club/${club._id}`}>
                                           <img className={'w-[2.25rem] h-[2.25rem] sm:w-[3.75rem] sm:h-[3.75rem] '}
                                                src={'club.png'} alt={'chess club'}/>
                                           <div className={'flex flex-col'}>
                                              <span>{club.clubname}</span>
                                              <span
                                                  className={'text-sm hidden sm:inline-block'}>{club.membersCount} Members</span>
                                           </div>
                                        </Link>
                                     </div>
                                 ))}
                              </div>
                           </div>
                       )
                }

             </div>
          </div>
          <CreateClubModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>

       </div>
   );
};

export default Clubs;
