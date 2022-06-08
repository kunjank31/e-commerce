import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import AccountWrapper from "../Components/AccountWrapper";
import Layout from "../Components/Layout";
import useInput from "../hooks/useInput";
import { resetPassword } from "../http/api-http";

const ResetPassword = () => {
  const [oldPassword, bindOldPassword, resetOldPassword] = useInput("");
  const [newPassword, bindNewPassword, resetNewPassword] = useInput("");
  const [cpassword, bindCpassword, resetCpassword] = useInput("");
  const { user } = useSelector((state) => state.Auth);
  const handleBtn = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === cpassword) {
        const { data } = await resetPassword(user.id, {
          password: oldPassword,
          newPassword,
        });
        toast.success(data.message);
      } else {
        toast.error("Confirm Password does not match!");
      }
    } catch ({ response: { data } }) {
      toast.error(data.message);
    }
    resetCpassword();
    resetOldPassword();
    resetNewPassword();
  };
  return (
    <>
      <Toaster reverseOrder={false} position="top right" />
      <Layout>
        <AccountWrapper>
          <h2 className="font-semibold text-2xl">Reset Password</h2>
          <div className="flex space-y-3 py-5 flex-col sm:w-1/2">
            <input
              type="password"
              className="border-[1px] px-3 py-2 outline-none"
              placeholder="Old Password"
              {...bindOldPassword}
            />
            <input
              type="password"
              className="border-[1px] px-3 py-2 outline-none"
              placeholder="New Password"
              {...bindNewPassword}
            />
            <input
              type="password"
              className="border-[1px] px-3 py-2 outline-none"
              placeholder="Confirm Password"
              {...bindCpassword}
            />
            <button
              className="bg-green-800 text-white px-3 py-2 text-xl"
              onClick={handleBtn}
            >
              Save
            </button>
          </div>
        </AccountWrapper>
      </Layout>
    </>
  );
};

export default ResetPassword;
