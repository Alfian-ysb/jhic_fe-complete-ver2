import React from "react";
import SkansabaDev from "../assets/img/SkansabaDev.svg";

type Props = {
  title: string;
  children: React.ReactNode;
};

const AuthCard: React.FC<Props> = ({ title, children }) => {
  return (
    <main className="min-h-screen flex items-start justify-center p-6">
      <section className="md:border-[#666666]/50 md:border md:rounded-2xl lg:w-[30%] lg:h-[75%] flex flex-col justify-center items-center bg-white md:w-[70%] w-full h-full lg:m-auto">
        <header className="flex items-center self-start md:ml-10 md:mt-10 md:mb-14 mb-10">
          <img src={SkansabaDev} alt="Skansaba Dev logo" className="md:w-12 h-auto md:mr-3 w-9 " />
          <h1 className="font-poppins md:text-2xl text-[16px]">SKANSABA.DEV</h1>
        </header>

        <h2 className="md:text-4xl text-3xl mb-10 font-poppins">{title}</h2>

        {children}
      </section>
    </main>
  );
};

export default AuthCard;
