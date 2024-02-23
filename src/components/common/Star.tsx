
const Star = ({rating}:{rating:number}) => {
  return (
    <div className="star-rating flex">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <p
            key={index}
            className={index <=  rating ? "text-primary" : "text-secondary"}
          >
            <span className="text-4xl">&#9733;</span>
          </p>
        );
      })}
    </div>
  );
};
export default Star