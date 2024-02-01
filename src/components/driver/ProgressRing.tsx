import  { useState, useEffect } from 'react';

const ProgressRing = ({ counter }:{counter:number}) => {
  const [circumference, setCircumference] = useState(0);

  const circleRadius = 30; 
  const newCircumference = 2 * Math.PI * circleRadius;
  const percent = ((15 - counter) / 15) * 100;
  useEffect(() => {
    setCircumference(newCircumference);
  }, []);

  return (
    <div className=" inline-flex items-center justify-center overflow-hidden rounded-full">
      <svg className="w-20 h-20">
        <circle
          className="text-gray-300"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-primary"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute text-xl text-black">{`${counter}`}</span>
    </div>
  );
};

export default ProgressRing;
