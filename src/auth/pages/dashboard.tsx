import React from "react";
import Navbar from "../components/navbar";
import ChooseCard from "../components/ChooseCard";
import PreviewSabaQuiz from "../assets/img/PreviewSabaQuiz.png";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar position="" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8 md:mb-12">
          Pick Your Destination
        </h1>
        
        <div className="w-full max-w-7xl flex gap-4 md:gap-6 justify-between">
          <ChooseCard 
            title="SabaQuiz" 
            img={PreviewSabaQuiz} 
            to="/" 
            external={true}
          />
          <ChooseCard 
            title="Lentera Karya" 
            img={PreviewSabaQuiz} 
            to="/" 
            external={true} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;