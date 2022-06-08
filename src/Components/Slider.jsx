import React, { useEffect, useState } from "react";
import { sliderItems } from "../data";
import CustomButton from "./CustomButton";
const Slider = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  useEffect(() => {
    const c = setTimeout(
      () =>
        setSliderIndex((prev) =>
          prev === sliderItems.length - 1 ? 0 : sliderIndex + 1
        ),
      3000
    );
    return () => {
      clearTimeout(c);
    };
  }, [sliderIndex]);
  return (
    <>
      <div className="slider relative overflow-hidden">
        <div
          className="slider-item"
          style={{ transform: `translate3d(-${sliderIndex * 100}vw,0,0)` }}
        >
          {sliderItems.map((i) => {
            return (
              <div
                className="box1 h-[35vh] w-[100vw] sm:h-[calc(100vh-76px)] flex items-center justify-between"
                key={i.id}
                style={{ background: `#${i.bg}` }}
              >
                <img
                  src={i.img}
                  alt=""
                  className="h-[50%] sm:h-full block sm:flex-1 object-contain"
                />
                <div className="desc-wrapper sm:flex-1">
                  <h2 className="font-semibold text-2xl sm:text-7xl">
                    {i.title}
                  </h2>
                  <h4 className="text-sm sm:text-2xl py-5 sm:py-14">
                    {i.desc}
                  </h4>
                  <CustomButton to="/" restCss="text-sm px-2 py-1">
                    SHOP NOW
                  </CustomButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Slider;
