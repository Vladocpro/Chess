const Loader = () => {
   return (
       <div className={'flex justify-center items-center mt-[20%]'}>
          <div
              className="inline-block h-[60px] w-[60px] animate-spin rounded-full border-6 border-solid border-primaryGreen border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]">
          </div>
       </div>
   );
};

export default Loader;
