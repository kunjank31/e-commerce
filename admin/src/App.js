import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import useLoadingWithLogin from './hooks/useLoadingWithLogin'
import NewUser from "./pages/new user/NewUser";
import SingleUser from "./pages/single user/SingleUser";
import UserList from "./pages/User List/UserList";
import ProductList from "./pages/Product LIst/ProductList";
import SingleProduct from './pages/SingleProduct/SingleProduct'
import NewProduct from "./pages/NewProduct/NewProduct";
import { useEffect } from "react";
import { getIncome, getOrders, userFetch } from "./http/api-http";
import { setOrderError, setOrderList, setUserError, setUserList, setIncome } from "./store/slice/productNOrder";
import Loading from "./components/Loading/Loading";
import toast from "react-hot-toast";
import Orders from "./pages/orders/Orders";

function App() {
  const { auth } = useSelector(state => state.Auth)
  const [loading] = useLoadingWithLogin()
  const dispatch = useDispatch()
  useEffect(() => {
    const userList = async () => {
      try {
        const { data } = await userFetch()
        dispatch(setUserList(data))
      } catch ({ response: { data } }) {
        dispatch(setUserError(data))
      }
    }
    userList()
  }, [dispatch])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getOrders()
        const { data: income } = await getIncome()
        Promise.all([data, income]).then(d => dispatch(setOrderList(d))).catch(e => toast.error(e.message))
      } catch ({ response: { data } }) {
        dispatch(setOrderError(data))
      }
    })()
  }, [dispatch])

  return (
    <>
      {loading ? <Loading text={"Loading..."} /> :
        <Routes>
          <Route path="/">
            <Route index element={<ProtectedRoute Component={Home} />} />
            <Route path="login" element={auth ? <Navigate to='/' /> : <Login />} />
            <Route path="users">
              <Route index element={<ProtectedRoute Component={UserList} />} />
              <Route path=":userId" element={<ProtectedRoute Component={SingleUser} />} />
              <Route
                path="new"
                element={<ProtectedRoute Component={NewUser} />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ProtectedRoute Component={ProductList} />} />
              <Route path=":productId" element={<ProtectedRoute Component={SingleProduct} />} />
              <Route
                path="new"
                element={<ProtectedRoute Component={NewProduct} />}
              />
            </Route>
            {/* <Route path="orders" element={<ProtectedRoute Component={Orders} />}/> */}
          </Route>
        </Routes>
      }
    </>
  );
}

const ProtectedRoute = ({ Component, location }) => {
  const { auth } = useSelector(state => state.Auth)
  return auth ? <Component /> : <Navigate to='/login' state={{ from: location }} />

}


export default App;
