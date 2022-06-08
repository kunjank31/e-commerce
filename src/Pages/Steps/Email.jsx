import React from "react";
import useInput from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { setEmail } from "../../Store/slices/authSlice";

const Email = ({ onNext }) => {
  const dispatch = useDispatch();
  const [email, bindEmail] = useInput("");
  const save = () => {
    dispatch(setEmail(email));
    onNext();
  };
  return (
    <>
      <input
        type="text"
        className="border-[1px] border-gray-800 w-full p-2 mb-4 outline-none"
        placeholder="Email Address"
        {...bindEmail}
      />
      <button
        className="bg-teal-700 text-white px-6 py-3 mt-2 sm:w-[40%]"
        onClick={save}
      >
        Click
      </button>
    </>
  );
};

export default Email;
