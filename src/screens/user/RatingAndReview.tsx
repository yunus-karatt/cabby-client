import { useEffect, useState } from "react";
import StarRating from "../../components/common/StarRating";
import Navbar from "../../components/user/Navbar";
import { toast } from "react-toastify";
import { RideData } from "../../interface/driver/driverInterface";
import { userAxios } from "../../constraints/axios/userAxios";
import userApi from "../../constraints/api/userApi";
import { useNavigate } from "react-router";

const RatingAndReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [rideData, setRideData] = useState<RideData | null>(null);

  const navigate=useNavigate()

  const searchParams = new URLSearchParams(location.search);
  const rideId = searchParams.get("rideId");
  const isScheduled=searchParams.get('scheduled')

  const handleIgnore=async()=>{
    navigate('/')
  }

  const handleSubmit = async() => {
    if (!review && !rating) {
      toast.error("Please review your driver");
      return;
    }
    let reviewData: {
      userId?: string;
      driverId?: string;
      rating: number;
      review: string;
      scheduledRideId?: string; 
      rideId?: string; 
    } = {
      userId: rideData?.userId,
      driverId: rideData?.driverId,
      rating,
      review
    };
    if (rideData?.pickUpDate) {
      reviewData.scheduledRideId = rideData._id;
    } else {
      reviewData.rideId = rideData?._id;
    }
   const res= await userAxios.post(userApi.reviewAndRating,reviewData)
   if(res.data){
    toast.success('Thank you for the valuable feedback')
    navigate('/')
   }
  };

  useEffect(() => {
    
    const fetchRideData = async () => {
      if(isScheduled==='false'){
        console.log({rideId})
        const res = await userAxios.get(`${userApi.getQuickRide}/${rideId}`);
        setRideData(() => res.data);
      }
    };
    fetchRideData();
  }, []);

  return (
    <div className="bg-secondary h-lvh">
      <Navbar />
      <div className="h-full w-full flex items-center justify-center">
        <div className="bg-white w-[500px] h-[500px] p-2 rounded shadow-lg">
          <h1 className="text-3xl font-bold ms-5 my-3">Feed Back</h1>
          <hr />
          <p className="ms-5 my-3 text-xl font-semibold">Rating</p>
          <div className="ms-5 my-3 flex justify-center">
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <p className="ms-5 my-3 text-xl font-semibold">Review</p>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="ms-5 border"
            name="review"
            id="review"
            cols={60}
            rows={8}
          ></textarea>
          <div className="flex w-full justify-center gap-x-5 my-3">
            <button
              className="bg-success text-white p-3 rounded-md w-28 hover:opacity-90"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button onClick={handleIgnore} className="bg-danger text-white p-3 rounded-md w-28 hover:opacity-90">
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingAndReview;
