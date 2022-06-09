import React, { useEffect } from "react";
import "./login.scss";
import { NavLink } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { userLogin } from "../../http/api-http";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { setAuth } from '../../store/slice/authSlice'

const Login = () => {
  const [email, bindEmail, resetEmail] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");
  const dispatch = useDispatch()
  const Sumbit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please Fill the all fields");
    }
    try {
      const { data } = await userLogin({ email, password });
      if (data) {
        dispatch(setAuth(data))
        resetEmail()
        resetPassword()
        window.location.reload()
      }

    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(message);
    }
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="login">
        <form>
          <h2>Login</h2>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" {...bindEmail} />
          </div>
          <div className="formGroup">
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              {...bindPassword}
            />
          </div>
          <div className="flex">
            <p>
              Don't have an account? <NavLink to="/"> Register Now</NavLink>
            </p>
            <p>
              <NavLink to="/">Forgot Password?</NavLink>
            </p>
          </div>
          <button type="submit" onClick={Sumbit}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
