import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import StripeCheckout from 'react-stripe-checkout'
import { useSelector } from "react-redux";
import { orderCreate, paymentMade } from "../http/api-http";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'

const CheckOut = ({ total, orderItems }) => {
  const navigate = useNavigate()
  const [typeMode, setTypeMode] = useState('Cash on delivery')
  const { auth, user } = useSelector(state => state.Auth)
  let amount = total >= 500 ? total : total + 60
  const makePayment = async (token) => {

    try {
      const { data } = await paymentMade({ amount, token })
      if (data) {
        const { data: created } = await orderCreate({
          products: orderItems,
          orderId: uuidv4(),
          address: "Kolkata",
          status: "pending",
          paymentMode: "card",
          paymentStatus: "paid",
          paymentInfo: data,
          amount,
        })
        toast.success(created.message);
        localStorage.clear('products')
        window.location.href = data.receipt_url
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const setType = (type) => {
    if (type === 'cod') {
      setTypeMode('Cash on delivery')
    } else {
      setTypeMode('card')
    }
  }

  return (
    <>
      <Toaster position="top right" reverseOrder={false} />
      <div className="pt-5 rounded-2xl checkout border-[1px] border-gray-300 2xl:w-[40%] h-[100%]">
        <div className="px-5">
          <h2 className="text-4xl font-light mb-4">CHECKOUT</h2>
          <table className="w-full uppercase">
            <tbody>
              <tr className="text-xl font-light">
                <td className="pb-3 pt-2 ">Amount</td>
                <td className="pb-3 pt-2 text-right">{total}</td>
              </tr>
              <tr className="text-xl font-light">
                <td className="pb-3 pt-2 ">shipping charge</td>
                <td className="pb-3 pt-2 text-right">60</td>
              </tr>
              {total >= 500 && <tr className="text-xl font-light">
                <td className="pb-3 pt-2 ">discount</td>
                <td className="pb-3 pt-2 text-right">-60</td>
              </tr>}
              <tr className="text-2xl ">
                <td className="pb-3 pt-2 ">TOTAL</td>
                <td className="pb-3 pt-2 text-right">{amount}</td>
              </tr>
            </tbody>
          </table>
        </div>


        {auth ?
          <>
            <div className="mt-3">
              <div className="border-b border-t py-3 px-5">
                <input type="radio" name="mode" id="cash" className="mr-3" onClick={() => setType("cod")} />
                <label htmlFor="cash">COD</label>
              </div>
              <div className="border-b py-3 px-5">
                <input type="radio" name="mode" id="card" className="mr-3" onClick={() => setType("card")} />
                <label htmlFor="card">CARD</label>
              </div>
            </div>
            {typeMode === "card" ?
              <StripeCheckout
                token={makePayment}
                // shippingAddress
                image="/vector.jpg"
                name={user.name}
                stripeKey={process.env.REACT_APP_CLIENT_KEY}
                amount={amount * 100}
                currency="INR"
              >
                <button type="submit" className="bg-black w-full py-3 px-5 text-white uppercase rounded-b-2xl">
                  Pay with card
                </button>
              </StripeCheckout>
              :
              <button type="submit" className="bg-black w-full py-3 px-5 text-white uppercase rounded-b-2xl">
                Cash on delivery
              </button>}
          </>
          : (
            <button type="submit" className="bg-black w-full py-3 px-5 text-white uppercase rounded-b-2xl" onClick={() => navigate('/login')}>
              sign in
            </button>
          )
        }
      </div>

    </>
  );
};

export default CheckOut;
