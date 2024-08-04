import React from "react";

export const Heading = ({ label }) => {
  return (
    <h1 className="mt-4 mb-2 text-4xl font-bold leading-tight text-gray-900 text-center">
      {label}
    </h1>
  );
};
