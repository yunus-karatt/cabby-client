import SideBar from "../../components/driver/Sidebar";
import DriverHeader from "../../components/driver/DriverHeader";
import avathar from "../../assets/avatar 1.png";
import Star from "../../components/common/Star";
import { useEffect, useState } from "react";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { Review } from "../../interface/common/common";
import Spinner from "../../components/common/Spinner";

const Feedbacks = () => {

  const [review, setReview] = useState<Review[]>();
  const { driverInfo } = useSelector((state: rootState) => state.driverAuth);
  const [loading, setLoading] = useState(true);

  const formatDateTime = (dateTimeString: Date) => {
    const options: any = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format
      timeZone: "Asia/Kolkata", // Set timezone to Indian Standard Time
    };
    return new Date(dateTimeString).toLocaleDateString("en-IN", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await driverAxios.get(
          `${driverApi.getReview}/${driverInfo.id}`
        );
        setReview(() => res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <DriverHeader />
      <div className="flex">
        <SideBar />
        <div className="bg-hover w-full flex flex-col gap-y-5">
          <div className="md:p-5 mx-2">
            <h1 className="font-bold text-4xl">Feedbacks</h1>
          </div>
          {loading ? (
            <div className="flex w-full justify-center items-center">

              <Spinner />
            </div>
          ) : (
            <div className="p-5">
              {review?.map((data) => {
                return (
                  <div
                    key={data._id}
                    className="bg-white w-[600px] h-48 py-5 px-10 mb-5 rounded-md"
                  >
                    <div className="flex  justify-between items-center">
                      <img
                        className="w-[70px] h-[70px] object-fill "
                        src={avathar}
                        alt="avthar"
                      />
                      <div>
                        <p className="font-bold text-xl capitalize">{data.userId?.firstName}</p>
                        <p className="text-text-secondary"> {formatDateTime(data.date)}</p>
                      </div>
                      <div className="">
                        <Star rating={data.rating} />
                      </div>
                    </div>
                    <hr className="mt-5" />
                    <div className="mt-5">
                      <p>{data.review}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feedbacks;
