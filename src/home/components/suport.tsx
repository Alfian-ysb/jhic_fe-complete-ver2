import LogoJhic from "../assets/img/JhicLogo/JHICLogo.png";
import GarudaSpark from "../assets/img/JhicLogo/GarudaSparkLogo.png"
import JagoanHosting from "../assets/img/JhicLogo/JagoanHostingLogo.png"
import Komdigi from "../assets/img/JhicLogo/KomdigiLogo.png"
import MaspionIT from "../assets/img/JhicLogo/MaspionITLogo.png"

const suport = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center mx-auto py-8">
        <p className="text-2xl text-neutral-500">JHIC Powered by</p>
        <div className="flex flex-wrap items-center justify-center w-fit">
          <img src={LogoJhic} alt="4 logo jhic" className="w-[12rem] object-contain h-auto lg:grayscale-90 hover:grayscale-0"/>
          <img src={JagoanHosting} alt="4 logo jhic" className="w-[12rem] object-contain h-auto lg:grayscale-90 hover:grayscale-0"/>
          <img src={Komdigi} alt="4 logo jhic" className="w-[12rem] object-contain h-auto lg:grayscale-90 hover:grayscale-0"/>
          <img src={MaspionIT} alt="4 logo jhic" className="w-[12rem] object-contain h-auto lg:grayscale-90 hover:grayscale-0"/>
          <img src={GarudaSpark} alt="4 logo jhic" className="w-[12rem] object-contain h-auto lg:grayscale-90 hover:grayscale-0"/>
        </div>
      </div>
    </div>
  );
};

export default suport;
