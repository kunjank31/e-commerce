import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <NavLink
        to={"/products/" + product.slug}
        className="popularItems block bg-[#f5fafd] min-w-[280px] relative flex-1 h-[350px] m-5 sm:my-1 sm:ml-1"
      >
        <div className="w-52 rounded-full h-52 bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
        <img
          src={product.productImg[0]}
          alt=""
          className="w-full h-full object-contain absolute"
        />
        <div className="icons absolute bg-[rgba(0,0,0,0.2)] w-full h-full opacity-0 cursor-pointer flex justify-center items-center">
          <ShoppingCartOutlined className="bg-white mx-3 p-2 rounded-full icons-touch" />
          <SearchOutlined className="bg-white mx-3 p-2 rounded-full icons-touch" />
          <FavoriteBorderOutlined className="bg-white mx-3 p-2 rounded-full icons-touch" />
        </div>
      </NavLink>
    </>
  );
};

export default ProductCard;
