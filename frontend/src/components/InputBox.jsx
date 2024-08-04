import React from "react";

export const InputBox = ({
  list,
  htmlFor,
  label,
  inputType,
  placeholder,
  onChange,
}) => {
  return (
    <div className="flex flex-col mt-3">
      <label htmlFor={htmlFor} className="mb-2 text-md font-bold">
        {label}
      </label>
      <input
        list={list}
        onChange={onChange}
        type={inputType}
        placeholder={placeholder}
        className="px-3 py-1.5  border-2 border-gray-300 outline-none rounded-lg focus:outline"
        required
      />
    </div>
  );
};
