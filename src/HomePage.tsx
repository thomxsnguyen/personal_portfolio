import React from "react";
import profilePic from "./assets/profilepic.jpg";

interface HomePageProps {
  name: string;
}

const HomePage: React.FC<HomePageProps> = ({ name }) => {
  return (
    <section
      id="home"
      className="flex flex-row items-center gap-x-18 py-80 p-40"
    >
      <div className="flex flex-col gap-y-.5">
        <h1 className="text-6xl font-bold text-gray-800">{name}</h1>
        <h2 className="text-2xl text-gray-600 mt-1 ">
          Computer Science Student at UCI
        </h2>
      </div>
      <img
        src={profilePic}
        alt="profilepic"
        className="w-54 h-54 rounded-full object-cover shadow-lg"
      />
    </section>
  );
};

export default HomePage;
