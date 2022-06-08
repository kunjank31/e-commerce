import { Send } from "@mui/icons-material";
import React from "react";

const NewsLetter = () => {
  return (
    <>
      <div className="flex p-2 h-[50vh] bg-[#fcf5f5] justify-center items-center flex-col">
        <h2 className="text-5xl sm:text-7xl font-bold">Newsletter </h2>
        <h3 className="pt-5 text-[15px] sm:text-2xl font-light">
          Get timely updates from your favorite products.
        </h3> 
        <div className="flex w-full sm:w-[45%] justify-center border-gray-300 mt-5">
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-2 px-3 border-[1px] outline-none"
          />
          <button className="bg-teal-700 px-5 sm:px-10">
            <Send className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
