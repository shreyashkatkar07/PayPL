import React from "react";
import { Link } from "react-router-dom";

export const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="flex justify-center mt-2 mb-4">
      <p>{label}</p>
      <Link className="ml-2 underline" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};
