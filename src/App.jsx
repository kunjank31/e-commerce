import { useSelector } from "react-redux";
import { Navigate, Route, Routes as Switch } from "react-router-dom";
import Loading from "./Components/Loading/Loading";
import useLoadingWithRefresh from "./hooks/useLoadingWithRefresh";
import {
  Home,
  Login,
  Product,
  ProductList,
  Register,
  Cart,
  MyOrder,
  Account,
} from "./Pages";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import SingleOrderPage from "./Pages/SingleOrderPage";
import "./styles/app.css";
const App = () => {
  const loading = useLoadingWithRefresh();
  const { auth } = useSelector((state) => state.Auth);

  return (
    <>
      {loading ? (
        <Loading text={"Loading..."} />
      ) : (
        <Switch>
          <Route path="/">
            <Route index element={<PublicRoute Component={Home} />} />
            <Route path="products">
              <Route index element={<PublicRoute Component={ProductList} />} />
              <Route
                path=":slug"
                element={<PublicRoute Component={Product} />}
              />
              <Route
                path="category/:cat"
                element={<PublicRoute Component={ProductList} />}
              />
            </Route>
            <Route path="cart" element={<PublicRoute Component={Cart} />} />
            <Route
              path="register"
              element={<PublicRoute Component={Register} />}
            />
            <Route
              path="login"
              element={auth ? <Navigate to="/" /> : <Login />}
            />
            <Route path="account">
              <Route index element={<ProtectedRoute Component={Account} />} />
              <Route
                path="reset-password"
                element={<ProtectedRoute Component={ResetPassword} />}
              />
            </Route>
            <Route path="orders">
              <Route index element={<ProtectedRoute Component={MyOrder} />} />
              <Route
                path="order_details"
                element={<ProtectedRoute Component={SingleOrderPage} />}
              />
            </Route>
            <Route path="forget-password" element={<PublicRoute Component={ForgetPassword} />}/>
          </Route>
        </Switch>
      )}
    </>
  );
};

const ProtectedRoute = ({ Component, location }) => {
  const { auth } = useSelector((state) => state.Auth);
  return auth ? <Component /> : <Navigate to="/" from={{ state: location }} />;
};

const PublicRoute = ({ Component, location }) => {
  return <Component />;
};

export default App;
