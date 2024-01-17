import React from "react";
import Navbar from "../../components/user/Navbar";
import homePhoto from "../../assets/Ride-with-Uber.png.png";
import u4d from "../../assets/u4b-square.png.png";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-secondary">
        <div className="flex flex-col justify-evenly items-center bg-primary w-full min-h-[650px] gap-10 p-5 md:flex-row">
          <div>
            <h1 className="text-white font-bold	text-5xl">
              Go anywhere with <br /> Cabby
            </h1>
            <p className="text-white font-normal mt-3 text-xs">
              Request a ride, hop in, and go.
            </p>
            <div className="flex flex-col">
              <input
                type="text"
                className="border p-2 mt-3 rounded-lg"
                placeholder="Enter Location"
              />
              <input
                type="text"
                className="border p-2 mt-3 rounded-lg"
                placeholder="Enter Destination"
              />
            </div>
            <button className="bg-secondary p-2 mt-3 rounded-lg">
              See Prices
            </button>
          </div>
          <div>
            <img src={homePhoto} alt="landing photo" className="h-[580px]" />
          </div>
        </div>
        <div className=" flex flex-col md:flex-row p-5 justify-evenly items-center gap-10 mt-5">
          <div>
            <img src={u4d} alt="driver photo" />
          </div>
          <div className="flex flex-col gap-10">
            <h1 className="text-primary font-bold	text-5xl">
              Drive when you <br /> want, make what
              <br /> you need
            </h1>
            <p className="text-primary font-normal text-xs">
              Make money on your schedule with deliveries or rides—or <br />{" "}
              both. You can use your own car or choose a rental <br /> through
              Uber.
            </p>
            <button className="bg-primary text-white p-3 rounded-lg ">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
