import { useEffect, useState } from "react";
import axios from "axios";
import { setAuth } from "../store/slice/authSlice";
import { useDispatch } from "react-redux";


const useLoadingWithLogin = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_URL}/auth/refresh`, {
                    withCredentials: true,
                })
                dispatch(setAuth(data))
                setLoading(false)
            } catch (error) {
                setLoading(false)
                return error
            }
        })()
    }, [dispatch])
    return [loading]
}

export default useLoadingWithLogin