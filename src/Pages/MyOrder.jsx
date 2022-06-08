import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useSelector } from "react-redux";
import OrderDetails from "../Components/OrderDetails";
import toast, { Toaster } from "react-hot-toast";
import { getOrder } from "../http/api-http";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.Auth);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getOrder('?userId=' + user?.id)
        setOrders(data)
      } catch ({ response: { data } }) {
        toast.error(data.message)
      }
    })()
  }, [user?.id]);
  return (
    <>
      <Toaster position="top right" reverseOrder={false} />
      <Layout>
        <div className="bg-gray-100 pt-5 pb-10">
          <h1 className="mx-5 pb-5 font-bold text-3xl">My Orders</h1>
          <div className="mx-5 space-y-2">
            {orders?.map((o, i) => {
              return o.products.map((p, i) => {
                return <OrderDetails product={p.productId} key={i} order={o} />;
              });
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MyOrder;
