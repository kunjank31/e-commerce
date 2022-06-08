import {
  Add,
  CurrencyRupeeOutlined,
  DeleteOutline,
  Remove,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Layout from "../Components/Layout";
import toast, { Toaster } from "react-hot-toast";
import CheckOut from "../Components/CheckOut";
import CustomButton from "../Components/CustomButton";
import { useEffect } from "react";
import {
  removeCart,
  setDecrement,
  setIncrement,
  getTotals,
} from "../Store/slices/cartSlice";

const Cart = () => {
  const { auth } = useSelector((state) => state.Auth);
  const { products, total } = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const delCartItem = (id) => {
    dispatch(removeCart(id));
    toast.success("Item removed!");
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, products]);
  const orderItems = products.map((p) => {
    return { productId: p.id, qty: p.qty };
  });
  return (
    <>
      <Layout>
        <Toaster position="top-center" reverseOrder={false} />
        {products.length !== 0 ? (
          <div className="cart mb-5">
            <div className="cart-head">
              <h2 className="text-3xl font-extralight text-center my-5">
                YOUR BAG
              </h2>
              <div className="sm:flex justify-between px-8 py-3">
                <button className="border-2 border-gray-800 px-3 py-2 font-bold text-sm">
                  CONTINUE SHOPPING
                </button>
                <div className="sm:flex underline">
                  <button className="mr-2">Shopping Bag(2)</button>
                  <button>Your Wishlist Bag()</button>
                </div>
                {auth ? (
                  <button className="bg-gray-800 text-white px-3 py-2 font-bold text-sm">
                    CHECKOUT NOW
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="bg-gray-800 block text-white px-3 py-2 font-bold text-sm"
                  >
                    SIGN IN
                  </NavLink>
                )}
              </div>
            </div>
            <div className="2xl:flex px-5 my-5">
              <div className="items sm:pl-3 py-3 w-full space-y-4">
                {products?.map((c, i) => {
                  return (
                    <div
                      className="sm:flex items-center space-x-4 relative after:w-full after:h-[2px] after:bg-gray-100 after:absolute after:-bottom-2 last:after:hidden"
                      key={i}
                    >
                      <NavLink
                        to={"/product/" + c.id}
                        className="img w-[15rem]"
                      >
                        <img
                          src={c.productImg[0]}
                          className="object-contain w-full sm:h-[150px]"
                          alt=""
                        />
                      </NavLink>
                      <div className="details sm:flex justify-between sm:w-[70%]">
                        <ul>
                          <li>
                            <span className="font-bold mr-1">Product:</span>
                            {c.name}
                          </li>
                          <li className="my-4">
                            <span className="font-bold mr-1">ID:</span> {c.id}
                          </li>
                          <li className="mb-4">
                            <span
                              className="w-5 h-5 block border rounded-full"
                              style={{ background: `${c.color}` }}
                            ></span>
                          </li>
                          <li>
                            <span className="font-bold mr-1">Size:</span>
                            {c.size}
                          </li>
                        </ul>
                        <div className="flex sm:flex-col items-center justify-between my-4">
                          <div className="flex sm:mb-5 items-center">
                            <Remove
                              onClick={() => dispatch(setDecrement(c.id))}
                            />
                            <span className="number border-[1px] border-teal-600 px-3 py-1 rounded-lg font-bold mx-2">
                              {c.qty}
                            </span>
                            <Add onClick={() => dispatch(setIncrement(c.id))} />
                          </div>
                          <h3 className="font-extralight text-4xl">
                            <CurrencyRupeeOutlined className="currency" />
                            {c.qty * c.price}
                          </h3>
                        </div>
                      </div>
                      <DeleteOutline
                        className="delete cursor-pointer"
                        onClick={() => delCartItem(c.id)}
                      />
                    </div>
                  );
                })}
              </div>
              <CheckOut total={total} orderItems={orderItems} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center h-[calc(100vh-76px-28px)]">
            <img src="/emptyCart.svg" alt="" className="w-full sm:h-[50vh]" />
            <div className="my-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Your Shopping Cart is empty.
              </h2>
              <h3 className="text-xl sm:text-2xl font-medium py-3 pb-5">
                Add items you want to shop.
              </h3>
              <CustomButton to="/" restCss="px-5 py-3">
                SHOP NOW
              </CustomButton>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Cart;
