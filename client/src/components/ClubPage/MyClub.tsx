import userStore from "../../zustand/userStore.tsx";
import {Link} from "react-router-dom";

const MyClub = () => {

   const {club} = userStore()
   console.log(club)
   if (club === null) {
      return null
   }

   return (
       <div>
          <div className={'flex items-center gap-3 sm:gap-5 mb-1 '}>
             <span className={'font-bold text-base sm:text-xl py-2'}>My Club</span>
             {/*<span className={'bg-input rounded-md text-sm sm:text-base px-1'}>1 </span>*/}
          </div>
          <div className={'flex flex-col gap-3'}>
             <div className={'flex items-center justify-between gap-5'} key={club._id}>
                <Link className={'flex flex-[1] items-center gap-2 sm:gap-5'} to={`/club/${club._id}`}>
                   <img className={'w-[36px] h-[36px] sm:w-[64px] sm:h-[64px] '} src={'club.png'} alt={'chess club'}/>
                   <div className={'flex flex-col'}>
                      <span>{club.clubname}</span>
                      <span className={'text-sm hidden sm:inline-block'}>{club.membersCount} Members</span>
                   </div>
                </Link>
             </div>
          </div>
       </div>
   );
};

export default MyClub;
