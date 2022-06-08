import { Person } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const AccountWrapper = ({ children }) => {
  const { user } = useSelector((state) => state.Auth);
  return (
    <>
      <div className="flex px-10 py-5 min-h-[75vh] space-x-4 bg-gray-100 ">
        <div className="sidebar space-y-4 basis-[25%] w-full">
          <div className="flex items-center space-x-3 shadow-md p-3 bg-white">
            <img
              src={user?.image || "/vector.jpg"}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <span>Hello,</span>
              <h2>{user?.name}</h2>
            </div>
          </div>
          <div className="bg-white shadow-md">
            <span className="flex items-center p-3 font-bold text-gray-500 text-lg">
              <Person className="text-green-800 mr-3" /> ACCOUNT SETTINGS
            </span>
            <div className="pb-3">
              <NavLink
                to="/account"
                className="px-12 block py-2 hover:bg-green-50 hover:text-green-900 font-medium"
              >
                Profile Information
              </NavLink>
              <NavLink
                to=""
                className="px-12 block py-2 hover:bg-green-50 hover:text-green-900 font-medium"
              >
                Manage Addresses
              </NavLink>
              <NavLink
                to="/account/reset-password"
                className="px-12 block py-2 hover:bg-green-50 hover:text-green-900 font-medium"
              >
                Reset Password
              </NavLink>
              <NavLink
                to=""
                className="px-12 block py-2 hover:bg-green-50 hover:text-green-900 font-medium"
              >
                Payments
              </NavLink>
            </div>
          </div>
        </div>
        <div className="rightbar w-full bg-white shadow-md p-5">{children}</div>
      </div>
    </>
  );
};

export default AccountWrapper;
