// import { BrowserUpdated, InsertPhoto, Person } from "@mui/icons-material";
import React, { useState } from "react";
import {  useSelector } from "react-redux";
import Layout from "../Components/Layout";
import AccountWrapper from "../Components/AccountWrapper";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../firebase";
import useInput from "../hooks/useInput";
import { updateUser } from "../http/api-http";
import toast from "react-hot-toast";

const Account = () => {
  const { user } = useSelector((state) => state.Auth);
  const [isTrue, setIsTrue] = useState(false);
  const [name, bindName] = useInput(user.name);
  const [username, bindUsername] = useInput(user.username);

  const handleBtn = async (e) => {
    try {
      const { data } = await updateUser({ name, username });
      toast.success(data.message);
    } catch ({ response: { data } }) {
      toast.error(data.message);
    }
  };
  return (
    <>
      <Layout>
        <AccountWrapper>
          <div className="flex items-center space-x-4">
            <h2 className="font-semibold text-2xl">Personal Information</h2>
            <button
              className="font-bold text-green-800 text-xl"
              onClick={() => setIsTrue(!isTrue)}
            >
              {isTrue ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="flex space-y-3 py-5 flex-col sm:w-1/2">
            {/* <label htmlFor="img_upload" className="space-x-3">
              <BrowserUpdated className="text-white p-1 iconsAccount bg-green-800" />
              <span className="font-semibold text-gray-500">
                Upload your profile image
              </span>
              <input
                type="file"
                name="img"
                id="img_upload"
                disabled={isTrue ? "" : "disabled"}
                className="border-[1px] px-3 py-2 outline-none hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <img src={user?.image} alt="" className="object-cover" /> */}
            <input
              type="text"
              name="name"
              className="border-[1px] px-3 py-2 outline-none"
              disabled={isTrue ? "" : "disabled"}
              {...bindName}
            />
            <input
              type="text"
              name="username"
              className="border-[1px] px-3 py-2 outline-none"
              disabled={isTrue ? "" : "disabled"}
              {...bindUsername}
            />
            {isTrue && (
              <button
                className="bg-green-800 text-white px-3 py-2 text-xl"
                onClick={handleBtn}
              >
                Save
              </button>
            )}
          </div>
        </AccountWrapper>
      </Layout>
    </>
  );
};
export default Account;
