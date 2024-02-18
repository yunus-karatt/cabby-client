import { useEffect, useState } from "react";
import StarRating from "../../components/common/StarRating";
import Navbar from "../../components/user/Navbar";
import { toast } from "react-toastify";

const RatingAndReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const driverId = searchParams.get("driverId");

  const handleSubmit = () => {
    if (!review && !rating) {
      toast.error("Please review your driver");
      return;
    }
    console.log({ review, rating });
  };

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
            <button className="bg-danger text-white p-3 rounded-md w-28 hover:opacity-90">
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingAndReview;
