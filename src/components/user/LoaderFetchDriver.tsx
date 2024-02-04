import CabbyNav from "../auth/CabbyNav";
import CustomeLoader from "../common/CustomeLoader";

const LoaderFetchDriver = () => {
  return (
    <div
      className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-[50%]  md:w-[500px] md:h-[400px] bg-secondary 
    rounded-md border z-50"
    >
      <CabbyNav />
      <div className="flex flex-col gap-y-8 justify-center items-center mt-5">
        <p className="text-3xl font-semibold p-8">
          We are connecting to <br /> Nearby Drivers . . .
        </p>
        <div className="flex justify-center">
          <CustomeLoader />
        </div>
      </div>
    </div>
  );
};

export default LoaderFetchDriver;
