/* eslint-disable react/prop-types */
export const Balance = ({ balance }) => {
  return (
    <div className="mt-20 mx-6">
      <p className="text-xl font-bold">Your Balance : Rs.{Number(balance)}</p>
    </div>
  );
};
