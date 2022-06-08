import React from "react";
import { categories } from "../data";
import CustomButton from "./CustomButton";

const Featured = () => {
  return (
    <>
      <div className="featured wrapper sm:flex sm:p-5">
        {categories.map((c) => {
          return (
            <div
              className="items h-[30vh] mb-2 sm:h-[70vh] relative sm:ml-1"
              key={c.id}
            >
              <img src={c.img} alt="" className="h-full w-full object-cover" />
              <div className="detailsWrapper flex flex-col items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <h3 className="text-white font-bold text-lg sm:text-[32px] pb-7">
                  {c.title}
                </h3>
                <CustomButton
                  to="/products/category/women"
                  restCss="text-sm text-slate-600 px-2 py-1 border-0 font-semibold w-fit bg-white"
                >
                  SHOP NOW
                </CustomButton>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Featured;
