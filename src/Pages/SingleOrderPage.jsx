import React from "react";
import { Toaster } from "react-hot-toast";
import Layout from "../Components/Layout";

const SingleOrderPage = () => {
    let status = "in_transit";
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Layout>
                <div className="container mx-auto py-10">
                    <div className="flex justify-between">
                        <p className="flex flex-col w-full">
                            <span className={`block w-full h-1 mb-3 ${status === 'order_place' ? "bg-gray-500" : "bg-teal-700"} relative before:absolute before:w-3 before:h-3 ${status === 'order_place' ? "before:bg-gray-500" : "before:bg-teal-700"} before:rounded-full before:top-[-4px] before:left-0`}></span>
                            <span className={` ${status === 'order_place' ? "text-gray-500" : "text-teal-700"}`}>Order Placed</span>
                        </p>
                        <p className="flex flex-col w-full">
                            <span className={`block w-full h-1 mb-3 ${status === 'in_transit' ? "bg-gray-500" : "bg-teal-700"} relative before:absolute before:w-3 before:h-3 ${status === 'in_transit' ? "before:bg-gray-500" : "before:bg-teal-700"} before:rounded-full before:top-[-4px] before:left-0`}></span>
                            <span className={` ${status === 'in_transit' ? "text-gray-500" : "text-teal-700"}`}>In Transit</span>
                        </p>
                        <p className="flex flex-col w-full">
                            <span className={`block w-full h-1 mb-3 ${status === 'out_for_delivery' ? "bg-gray-500" : "bg-teal-700"} relative before:absolute before:w-3 before:h-3 ${status === 'out_for_delivery' ? "before:bg-gray-500" : "before:bg-teal-700"} before:rounded-full before:top-[-4px] before:left-0`}></span>
                            <span className={` ${status === 'out_for_delivery' ? "text-gray-500" : "text-teal-700"}`}>Out for delivery</span>
                        </p>
                        <p className="flex flex-col items-end w-full">
                            <span className={`block w-full h-1 mb-3 ${status === 'delivered' ? "bg-gray-500" : "bg-teal-700"} relative before:absolute before:w-3 before:h-3 ${status === 'delivered' ? "before:bg-gray-500" : "before:bg-teal-700"} before:rounded-full before:top-[-4px] before:right-0`}></span>
                            <span className={` ${status === 'delivered' ? "text-gray-500" : "text-teal-700"}`}>Delivered</span>
                        </p>

                    </div>
                </div>
            </Layout>
        </>
    );
};

export default SingleOrderPage;
