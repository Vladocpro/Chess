import React, {FC} from 'react';


interface FormInputProps {
   placeholder: string,
   containerStyles?: string,
   type?: string,
   isError: boolean,
   errorText: string,
   onChange: (text: string) => void,
}

const FormInput: FC<FormInputProps> = ({placeholder, containerStyles, type, isError, errorText, onChange}) => {


   return (
       <div className={containerStyles}>
          <div className={`relative`}>
             <input
                 type={type || 'text'}
                 id={`authInput${placeholder}`}
                 className={`block pr-2.5 pl-3 pb-2.5 pt-4 relative w-full text-sm sm:text-base text-white bg-transparent rounded-lg border-1 ${isError ? 'border-red-500' : 'border-neutral-600'} appearance-none  focus:outline-none focus:ring-0 focus:border-primaryGreen peer`}
                 placeholder=""
                 onChange={(e) => onChange(e.target.value)}
             />
             <label
                 htmlFor={`authInput${placeholder}`}
                 className={`absolute text-sm sm:text-base ${isError ? 'text-red-500' : 'text-neutral-400'} cursor-text duration-300 transform -translate-y-4 scale-100 top-2 z-10 origin-[0] bg-neutral-800  px-2 peer-focus:px-2 peer-focus:text-primaryGreen  peer-placeholder-shown:${isError ? 'text-red-500' : 'text-neutral-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-80 peer-focus:-translate-y-4 left-1`}>{placeholder}</label>
          </div>
          {isError ?
              <div className={'text-left pl-3.5'}><span className={"mt-2 text-xs text-red-600 "}>{errorText}</span>
              </div> : null}
       </div>


   );
};

export default FormInput;
