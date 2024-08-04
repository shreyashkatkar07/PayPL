/* eslint-disable react/prop-types */

export const Button = ({ label, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        type="submit"
        className="mt-5 py-2.5 w-full text-center text-lg font-medium bg-gray-800 text-white rounded-lg"
      >
        {label}
      </button>
    </div>
  );
};
