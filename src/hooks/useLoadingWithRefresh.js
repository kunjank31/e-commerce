import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../Store/slices/authSlice";

const useLoadingWithRefresh = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL}/auth/refresh`,
          { withCredentials: true }
        );
        if (data) {
          dispatch(setAuth(data));
          setLoading(false);
        }
      } catch ({ response: { data } }) {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  return loading;
};

export default useLoadingWithRefresh;
