import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";

export const Navbar = () => {
  const [dropOpen, setDropOpen] = useState(false);
  const divRef = useRef(null);

  const handleClick = () => {
    setDropOpen((dropOpen) => !dropOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        console.log("Clicked outside the div!");
        setDropOpen(false);
      }
    };

    if (dropOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropOpen]);

  return (
    <div className="fixed top-0 flex justify-between h-16 w-full bg-gray-900 shadow-2xl">
      <div className="flex justify-between w-full mx-6">
        <p className="flex items-center w-20 text-2xl text-white">PayPL</p>
        <div ref={divRef} className="flex justify-between items-center gap-2">
          {/* <p className="w-12 text-xl text-white">Hello</p> */}
          <div
            className="max-w-12 px-3 py-2 bg-gray-200 rounded-full hover:cursor-pointer text-gray-900"
            onClick={handleClick}
          >
            {localStorage.getItem("firstName")[0]}
            {localStorage.getItem("lastName")[0]}
          </div>
          <div ref={divRef}>{dropOpen && <Dropdown />}</div>
        </div>
      </div>
    </div>
  );
};
