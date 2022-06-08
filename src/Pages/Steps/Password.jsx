import React from "react";
import useInput from "../../hooks/useInput";
import toast, { Toaster } from "react-hot-toast";
import { forgetPassword } from "../../http/api-http";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Password = () => {
  const [password, bindPassword] = useInput("");
  const { email } = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await forgetPassword({ email, password });
      toast.success(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch ({ response: { data } }) {
      toast.error(data.message);
    }
  };

  return (
    <>
      <Toaster position="top right" reverseOrder={false} />
      <input
        type="password"
        className="border-[1px] border-gray-800 w-full p-2 mb-4 outline-none"
        placeholder="Enter your password"
        {...bindPassword}
      />
      <button
        className="bg-teal-700 text-white px-6 py-3 mt-2 sm:w-[40%]"
        onClick={handleSumbit}
      >
        Save
      </button>
    </>
  );
};

export default Password;
