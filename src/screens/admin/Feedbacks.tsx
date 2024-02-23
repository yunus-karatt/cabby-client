import SideBar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import avathar from "../../assets/avatar 1.png";
import Star from "../../components/common/Star";
import { useEffect, useState } from "react";
import { Review } from "../../interface/common/common";
import Spinner from "../../components/common/Spinner";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";

const Feedbacks = () => {
  const [review, setReview] = useState<Review[]>();
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
      const res = await adminAxios.get(adminApi.getFeedbacks);
      console.log({ res });
      setReview(() => res.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
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
                        <p className="font-bold text-xl capitalize">
                          {data.driverId?.firstName}
                        </p>
                        <p className="text-text-secondary">
                          {" "}
                          {formatDateTime(data.date)}
                        </p>
                      </div>
                    </div>
                    <hr className="mt-5" />
                    <div className="mt-5 flex justify-between">
                      
                      <div>
                        <p>"{data.review}"</p>
                        <p>({data.userId?.firstName})</p>
                      </div>
                      <div className="">
                        <Star rating={data.rating} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>{" "}
      </div>
    </>
  );
};

export default Feedbacks;
