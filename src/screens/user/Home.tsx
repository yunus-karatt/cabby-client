import React from "react";
import Navbar from "../../components/user/Navbar";
import homePhoto from "../../assets/Ride-with-Uber.png.png";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-secondary h-svh">
        <div className="flex justify-evenly items-center bg-primary w-full h-[600px] gap-10">
          <div>
            <h1 className="text-white font-bold	text-5xl">
              Go anywhere with <br /> Cabby
            </h1>
            <p className="text-white font-normal mt-3 text-xs">
              Request a ride, hop in, and go.
            </p>
            <div className="flex flex-col">
              <input type="text" className="border p-2 mt-3 rounded-lg" placeholder="Enter Location" />
              <input type="text" className="border p-2 mt-3 rounded-lg" placeholder="Enter Destination" />
            </div>
            <button className="bg-secondary p-2 mt-3 rounded-lg">See Prices</button>
          </div>
          <div>
            <img src={homePhoto} alt="landing photo" className="h-[580px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
