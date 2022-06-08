import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../http/api-http";
import { setAuth } from "../Store/slices/authSlice";
import useInput from "../hooks/useInput";

const Login = () => {
  const [email, bindEmail, resetEmail] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");
  const dispatch = useDispatch();
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      if (data) {
        dispatch(setAuth(data));
        resetEmail();
        resetPassword();
      }
    } catch ({ response: { data } }) {
      toast.error(data.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="login flex justify-center items-center">
        <form action="" className="bg-white p-5 m-5 z-10 sm:w-[28%]">
          <h2 className="mb-5 text-xl sm:text-2xl font-light">SIGN IN</h2>
          <input
            type="email"
            className="border-[1px] border-gray-800 w-full p-2 mb-4 outline-none"
            name="email"
            placeholder="email"
            {...bindEmail}
          />
          <input
            type="password"
            className="border-[1px] border-gray-800 w-full p-2 outline-none"
            name="password"
            placeholder="password"
            {...bindPassword}
          />
          <button
            className="bg-teal-700 text-white px-6 py-3 mt-2 sm:w-[40%]"
            onClick={handleSumbit}
          >
            SIGN IN
          </button>
          <NavLink
            to="/forget-password"
            className="underline block my-2 mt-3 text-xs"
          >
            DO NOT YOU REMEMBER THE PASSWORD?
          </NavLink>
          <NavLink to="/register" className="underline block my-2 text-xs">
            CREATE A NEW ACCOUNT
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default Login;
