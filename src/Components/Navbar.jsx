import {
  AccountCircle,
  KeyboardArrowDown,
  LogoutOutlined,
  Settings,
  ShoppingBasket,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { NavLink } from "react-router-dom";
import { setAuth } from '../Store/slices/authSlice'
import { logoutUser } from "../http/api-http";
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from "react";
import { getTotals } from "../Store/slices/cartSlice";

const Navbar = () => {
  const { auth } = useSelector((state) => state.Auth);
  const { qty, products } = useSelector(state => state.Cart)

  const dispatch = useDispatch()

  const logout = async () => {
    try {
      const { data } = await logoutUser()
      if (data) {
        dispatch(setAuth(data))
        window.location.reload()

      }
    } catch ({ response: { data } }) {
      toast.error(data.message)
    }
  };
  useEffect(() => {
    dispatch(getTotals())
  }, [dispatch, products])
  return (
    <>
      <Toaster reverseOrder={false} position='top right' />
      <nav className="navbar hidden sm:flex sm:items-center sm:px-5 sm:py-2">
        <div className="box2 sm:flex items-center w-full space-x-4">
          <NavLink to="/" className="text-[40px] font-[Vidaloka]">
            ShopKaro
          </NavLink>
          <Search />
        </div>

        <div className="box3 sm:w-full">
          <ul className="flex justify-end">
            <li className="mr-8">
              <NavLink to="/products/category/men">MENS</NavLink>
            </li>
            <li className="mr-8">
              <NavLink to="/products/category/women">WOMENS</NavLink>
            </li>
            <li className="mr-8">
              <NavLink to="/">KIDS</NavLink>
            </li>
            {auth ? (
              <li className="mr-8 relative dropdown">
                <span className="flex items-center cursor-pointer">
                  KUNJAN <KeyboardArrowDown className="ml-1 arrowDropdown" />
                </span>
                <ul className="absolute hidden  z-20 w-max bg-white top-6 left-[-49px] shadow">
                  <li className="border-b-[1px] pl-3 pr-16 py-4 last:border-0 hover:bg-gray-50">
                    <NavLink to="/orders">
                      <ShoppingBasket className="mr-4 text-green-800" />
                      MY ORDER
                    </NavLink>
                  </li>
                  <li className="border-b-[1px] pl-3 pr-16 py-4 last:border-0 hover:bg-gray-50">
                    <NavLink to="/account">
                      <AccountCircle className="mr-4 text-green-800" />
                      My Profile
                    </NavLink>
                  </li>
                  <li className="border-b-[1px] pl-3 pr-16 py-4 last:border-0 hover:bg-gray-50">
                    <NavLink to="/">
                      <Settings className="mr-4 text-green-800" />
                      Settings
                    </NavLink>
                  </li>
                  <li className="border-b-[1px] pl-3 pr-16 py-4 last:border-0 hover:bg-gray-50">
                    <button onClick={logout}>
                      <LogoutOutlined className="mr-4 text-green-800" />
                      LOGOUT
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="mr-8">
                <NavLink to="/login">LOGIN</NavLink>
              </li>
            )}

            <li>
              <NavLink to="/cart" className="relative">
                <ShoppingCartOutlined />
                {qty >= 1 && (
                  <span className="bg-green-900 text-white absolute rounded-full w-6 h-6 -right-3  -top-3   text-center">
                    {qty}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
