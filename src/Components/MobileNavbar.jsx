import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  PersonOutlineOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { logoutUser } from "../http/api-http";
import { setAuth } from "../Store/slices/authSlice";
import toast, { Toaster } from 'react-hot-toast'


const MobileNavbar = () => {
  const { auth } = useSelector((state) => state.Auth);
  const [scroll, setScroll] = useState(false);
  const { qty } = useSelector(state => state.Cart)
  const dispatch = useDispatch()


  window.onscroll = () => {
    setScroll(window.pageYOffset === 0 ? false : true);
    return () => window.onscroll === null;
  };
  const logout = async () => {
    try {
      const { data } = await logoutUser()
      if (data) {
        dispatch(setAuth(data))
        window.location.reload()
      }
    } catch ({ response: { data } }) {
      toast.error(data.message)
    }
  };
  return (
    <>
      <Toaster reverseOrder={false} position='top right' />
      <div
        className={`navbar sm:hidden bg-slate-700 text-white sm:justify-between sm:items-center sm:px-5 sm:py-2 ${scroll && "sticky z-50 top-0 left-0 bg-white"
          }`}
      >
        <div className="flex items-center p-2">
          <Menu />
          {!scroll ? (
            <div className="flex justify-between w-full pl-2 pr-4 ">
              <NavLink to="/" className="text-[25px]">
                ShopKaro
              </NavLink>
              <ul className="flex items-center ">
                <li className="mr-4">
                  {auth ? (
                    <button onClick={logout}>LOGOUT</button>
                  ) : (
                    <NavLink to="/login" className="flex items-center">
                      Sign In
                      <PersonOutlineOutlined className="ml-2" />
                    </NavLink>
                  )}
                </li>
                <li>
                  <NavLink to="/cart" className="relative">
                    <ShoppingCartOutlined />
                    {qty >= 1 && (
                      <span className="bg-green-900 text-white absolute rounded-full w-6 h-6 -right-3  -top-3   text-center">
                        {qty}
                      </span>
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div
                className={`search flex m-2 bg-white rounded-md ${scroll && "w-[80%]"
                  }`}
              >
                <input
                  type="search"
                  name="search"
                  id=""
                  placeholder="Search ShopKaro.com"
                  className="w-full outline-none px-2 rounded-md text-black"
                />
                <SearchOutlined className="searchIcon p-1 bg-yellow-600 text-black rounded-md" />
              </div>
              <NavLink to="/cart" className="relative">
                <ShoppingCartOutlined />
                {qty >= 1 && (
                  <span className="bg-green-900 text-white absolute rounded-full w-6 h-6 -right-3  -top-3   text-center">
                    {qty}
                  </span>
                )}
              </NavLink>
            </>
          )}
        </div>
        {!scroll && (
          <div className="search bg-white flex m-2 rounded-md">
            <Search />

          </div>
        )}
        <div className={scroll ? "hidden" : "py-2"}>
          <ul className="flex justify-around">
            <li className="">
              <NavLink to="/products/category/men">MENS</NavLink>
            </li>
            <li className="">
              <NavLink to="/products/category/women">WOMENS</NavLink>
            </li>
            <li className="">
              <NavLink to="/">KIDS</NavLink>
            </li>
            <li className="">
              <NavLink to="/">GIRLS</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
