import React from "react";

const Rating = ({ value }) => {
  const maxStars = 5;
  const filledStars = Math.round(value);

  return (
    <div className="flex items-center justify-center lg:justify-start">
      {[...Array(maxStars)].map((_, index) => (
        <svg
          key={index}
          className={`w-6 h-6 fill-current ${
            index < filledStars ? "text-yellow-500" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 1l1.66 5.18h5.75l-4.39 3.18 1.66 5.18-4.39-3.18-4.39 3.18 1.66-5.18-4.39-3.18h5.75z" />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
