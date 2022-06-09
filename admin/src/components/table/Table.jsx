import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const List = ({ productList }) => {
  const { productId } = useParams();
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const [userOrderedItem, setUserOrderedItem] = useState([]);
  const { orderList: orders } = useSelector((state) => state.ProductnOrder);
  useEffect(() => {
    if (orders && orders.length > 0) {
      if (productList === "product") {
        orders.filter((order) =>
          order.products.filter((product) =>
            product.productId._id === productId
              ? setUsers((prev) => [...prev, order.userId])
              : []
          )
        );
      } else if (userId) {
        orders.filter((order) =>
          order.userId._id === userId
            ? setUserOrderedItem((prev) => [...prev, order])
            : []
        );
      } else {
        setUserOrderedItem(orders);
      }
    }
  }, [orders, userId, productList, productId]);
  let newUsers = users.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t._id === value._id && t.name === value.name)
  );
  let order = userOrderedItem.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t._id === value._id && t.name === value.name)
  );
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          {productList === "product" ? (
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">email</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell className="tableCell">Order ID</TableCell>
              <TableCell className="tableCell">Product</TableCell>
              <TableCell className="tableCell">Brand</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment Method</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {productList === "product"
            ? newUsers.map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell className="tableCell">{row._id}</TableCell>
                    <TableCell className="tableCell">
                      <div className="cellWrapper">
                        <img
                          src={row.image || "/user-icon.png"}
                          alt=""
                          className="image"
                        />
                        {row.name}
                      </div>
                    </TableCell>
                    <TableCell className="tableCell">{row.email}</TableCell>
                  </TableRow>
                );
              })
            : order.map((p) => {
                return p.products.map((row) => (
                  <TableRow key={row.productId._id}>
                    <TableCell className="tableCell">{p.orderId}</TableCell>
                    <TableCell className="tableCell">
                      <div className="cellWrapper">
                        <img
                          src={row.productId.productImg[0]}
                          alt=""
                          className="image"
                        />
                        {row.productId.name}
                      </div>
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.productId.brand}
                    </TableCell>
                    <TableCell className="tableCell">
                      {moment(row.productId.createdAt).format("LLLL")}
                    </TableCell>
                    <TableCell className="tableCell">
                      ₹{row.productId.price}
                    </TableCell>
                    <TableCell
                      className={"tableCell " + p.paymentMode}
                      style={{ textTransform: "uppercase" }}
                    >
                      {p.paymentMode}
                    </TableCell>
                    <TableCell className="tableCell">
                      <span className={`status ${p.status}`}>{p.status}</span>
                    </TableCell>
                  </TableRow>
                ));
              })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
