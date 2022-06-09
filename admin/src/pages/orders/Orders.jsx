import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./orders.scss";
import { useEffect, useState } from "react";
import { getOrders } from "../../http/api-http";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getOrders();
        let obj = {};
        let arr = [];
        for (let item of data) {
          for (let {
            productId: { _id, name },
          } of item.products) {
            if (item.status !== "delivered") {
              obj = { ...{ productId: _id, productName: name } };
              obj["orderId"] = item.orderId;
              obj["custId"] = item.userId._id;
              obj["custName"] = item.userId.name;
              obj["status"] = item.status;
              obj["paymentStatus"] = item.paymentStatus;
              obj["mode"] = item.paymentMode;
              obj["orderDate"] = item.createdAt;
              arr.push(obj);
            }
          }
        }
        setOrders(arr);
      } catch ({ response: data }) {
        console.log(data);
      }
    })();
  }, []);

  const columns = [
    { field: "orderId", headerName: "Order Id", width: 300 },
    { field: "productId", headerName: "Product Id", width: 220 },
    { field: "productName", headerName: "Product Name", width: 170 },
    { field: "custName", headerName: "Customer", width: 100 },
    {
      field: "orderDate",
      headerName: "Order Place",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {moment(params.row.orderDate).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment",
      width: 80,
      renderCell: (params) => {
        return <div className="capt">{params.row.paymentStatus}</div>;
      },
    },
    {
      field: "mode",
      headerName: "Channel",
      width: 80,
      renderCell: (params) => {
        return <div className="capt">{params.row.mode}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 80,
      renderCell: (params) => {
        return <div className="capt">{params.row.status}</div>;
      },
    },
  ];

  return (
    <>
      <div className="orders">
        <Sidebar />
        <div className="ordersContainer">
          <Navbar />
          <div className="ordersTable">
            <h2 className="orderTitle">Orders</h2>
            <DataGrid
              rows={orders}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row) => row.productId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
