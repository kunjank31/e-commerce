import React from "react";
import { NavLink } from "react-router-dom";

const CustomButton = ({ to, children, restCss }) => {
  return (
    <>
      <NavLink
        to={to}
        className={`overflow-hidden inline-block hover:text-white z-10 border-2 border-b-black border-t-slate-500 border-l-slate-500 border-r-black sm:text-xl sm:py-2 sm:px-3 relative before:absolute before:w-full before:h-full before:bg-lime-500 before:top-0 before:left-0 before:origin-bottom-left before:-rotate-90 hover:before:-rotate-0 before:transition-all before:-z-10 ${restCss}`}
      >
        {children}
      </NavLink>
    </>
  );
};

export default CustomButton;
