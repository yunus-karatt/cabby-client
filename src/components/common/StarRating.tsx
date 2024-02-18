import { useState } from "react";

const StarRating = ({rating,setRating}:{rating:number,setRating:React.Dispatch<React.SetStateAction<number>>}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "text-primary" : "text-secondary"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="text-4xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
export default StarRating