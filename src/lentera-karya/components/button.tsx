// import React from 'react'

const button = ({ buttonText, url, blank, className }: { 
  buttonText: string,
  url: string,
  blank?: boolean,
  className?: string
}) => {
  return (
    <div className="w-fit h-fit">
      <button 
        className={`bg-[#f4f4f4] border-2 border-neutral-900 py-1.5 px-8 rounded-[100px] hover:bg-neutral-950 hover:text-white transition-all duration-200 cursor-pointer ${className}`}
        onClick={() => window.open(url, blank ? '_blank' : '_self')}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default button;
