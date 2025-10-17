
const title = ({text} : {text : string}) => {
  return (
    <div className="w-full flex flex-col items-center  font-tt-norms text-center my-8">
        <h1 className="text-xl font-normal lg:text-3xl text-[#888888]">
           {text}
        </h1>
        <h1 className="text-4xl lg:text-5xl font-bold text-[#063852]">
           SMKN 1 Bantul
        </h1>
      
      </div>
  );
};

export default title;
