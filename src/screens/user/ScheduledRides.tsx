import Navbar from "../../components/user/Navbar";

const ScheduledRides = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="h-lvh bg-secondary flex items-center justify-center">
          <div className="bg-white h-fit p-2 rounded-md w-[500px]">
            <div className="flex p-2 ">
              <div className="w-[50%] ms-5">
                <p className="text-text-secondary text-lg">From</p>
                <p className="font-bold text-2xl first-letter:capitalize">kaloor</p>
              </div>
              <div className="w-[50%]">
                <p className="text-text-secondary text-lg">To</p>
                <p className="font-bold text-2xl first-letter:capitalize">kaloor</p>
              </div>
            </div>
            <div className="flex p-2">
              <div className="w-[50%] ms-5">
                <p className="text-text-secondary text-lg">Distance</p>
                <p className="font-bold text-2xl first-letter:capitalize">10km</p>
              </div>
              <div className="w-[50%]">
                <p className="text-text-secondary text-lg">Amount</p>
                <p className="font-bold text-2xl first-letter:capitalize">₹ 400</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduledRides;
