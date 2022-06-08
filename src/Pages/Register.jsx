import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [register, setRegister] = useState({});
  const [cpass, setCpass] = useState("");
  const createUser = (e) => {
    setRegister((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const sumbitForm = (e) => {
    e.preventDefault();
    if (cpass === register.pass) {
    } else {
      toast.error("Your password is not matching!");
    }
  };
  return (
    <>
      <Toaster position="top right" reverseOrder={false} />
      <div className="register flex justify-center items-center">
        <form
          action=""
          className="bg-white p-5 m-5 z-10 sm:w-[40%]"
          onSubmit={sumbitForm}
        >
          <h2 className="mb-5 text-xl sm:text-2xl font-light">
            CREATE AN ACCOUNT
          </h2>
          <div className="sm:flex sm:space-x-2 sm:mb-4 w-full">
            <input
              type="text"
              className="border-[1px] border-gray-800 w-full mb-4 sm:mb-0 p-2 outline-none"
              name="name"
              placeholder="Name"
              onChange={createUser}
            />
            <input
              type="text"
              className="border-[1px] border-gray-800 w-full mb-4 sm:mb-0 p-2 outline-none"
              name="username"
              placeholder="username"
              onChange={createUser}
            />
          </div>
          <div className="sm:flex sm:space-x-2 sm:mb-4 w-full">
            <input
              type="number"
              className="border-[1px] border-gray-800 w-full mb-4 sm:mb-0 p-2 outline-none"
              name="phone"
              placeholder="number"
              onChange={createUser}
            />
            <input
              type="email"
              className="border-[1px] border-gray-800 w-full mb-4 sm:mb-0 p-2 outline-none"
              name="email"
              placeholder="email"
              onChange={createUser}
            />
          </div>
          <div className="sm:flex sm:space-x-2 sm:mb-4 w-full">
            <input
              type="password"
              className="border-[1px] border-gray-800 w-full p-2 mb-4 sm:mb-0 outline-none"
              name="pass"
              placeholder="password"
              onChange={createUser}
            />
            <input
              type="password"
              className="border-[1px] border-gray-800 w-full p-2 mb-4 sm:mb-0 outline-none"
              name="cpass"
              placeholder="confirm password"
              onChange={(e) => setCpass(e.target.value)}
            />
          </div>
          <div className="sm:mb-4 mb-4 w-full">
            <label htmlFor="terms">
              <input
                type="checkbox"
                name=""
                id="terms"
                className="mr-2"
                required
              />
              <span className="text-sm">
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY</b>
              </span>
            </label>
          </div>
          <input
            type="submit"
            value="CREATE"
            className="bg-teal-700 text-white px-6 py-3 sm:w-[40%]"
          />
          <span className="block my-2 mt-5">
            have an Account
            <NavLink to="/login" className="underline ml-1 text-blue-700">
              Login Now!
            </NavLink>
          </span>
        </form>
      </div>
    </>
  );
};

export default Register;
