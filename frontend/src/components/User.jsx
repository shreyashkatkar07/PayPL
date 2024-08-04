/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const User = ({ user }) => {
  return (
    <div className="flex justify-between mt-4">
      <div className="flex items-center gap-2">
        <p className="max-w-12 px-3 py-2 bg-gray-200 rounded-full hover:cursor-pointer text-gray-900">
          {user.firstName[0] + user.lastName[0]}
        </p>
        <p>{user.firstName + " " + user.lastName}</p>
      </div>
      <Link
        to={`/payment?id=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`}
        className="px-4 py-2 text-md bg-gray-900 text-gray-100 rounded-xl"
      >
        Send Money
      </Link>
    </div>
  );
};
