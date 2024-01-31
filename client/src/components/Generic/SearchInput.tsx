import {ChangeEvent, FC} from "react";

interface SearchInputProps {
   onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
   placeholder: string;
}

const SearchInput:FC<SearchInputProps> = ({onSearch, placeholder}) => {
   return (
       <div className="relative">
          <svg aria-hidden="true" className="absolute left-2 top-3"  viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
             <path className={'stroke-[#ffffffd9]'} strokeWidth="2"
                   d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853"></path>
          </svg>
          <input  type="text" onChange={onSearch} className=" bg-input w-full  outline-none outline-offset-0 focus:outline-primaryGreen text-[#ffffffd9] placeholder-[#ffffff80]  pl-10 pr-5  py-3 rounded-lg mr-10 " placeholder={placeholder}/>
       </div>
   );
};

export default SearchInput;
