import { CurrencyRupeeOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const OrderDetails = ({ product, order }) => {
  return (
    <>
      <div>
        <NavLink to={`/orders/order_details?orderId=${order.orderId}&txn_id=${order.paymentInfo.balance_transaction}`}>
          <div className="sm:grid grid-cols-4 space-x-3 sm:space-y-3 items-center border-[1px] sm:pr-16 bg-white rounded-md hover:shadow-lg cursor-pointer">
            <div className="sm:flex items-center space-x-3">
              <img
                src={product.productImg}
                alt=""
                className="object-contain sm:w-[12vw] sm:h-[12vh] p-4"
              />
              <div className="">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-400 text-sm font-medium">Color:Black</p>
                <p className="text-gray-400 text-sm font-medium">Size:24</p>
              </div>
            </div>
            <span className="sm:text-center my-5">
              <CurrencyRupeeOutlined className="currency cartCeckout" />
              {product.price}
            </span>
            <p className="sm:text-center uppercase">{order.paymentMode}</p>
            <p className="sm:text-center uppercase">{order.status}</p>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default OrderDetails;
