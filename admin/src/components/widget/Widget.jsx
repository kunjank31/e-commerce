import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  const { userList, orderList, income } = useSelector(state => state.ProductnOrder)
  const [monthIncome, setMonthIncome] = useState({})
  let data;
  useEffect(() => {
    income.filter(earn => {
      if (earn._id === new Date().getMonth() + 1) setMonthIncome(prev => { return { ...prev, currentMonth: earn.total } })
      if (earn._id === new Date().getMonth()) setMonthIncome(prev => { return { ...prev, lastMonth: earn.total } })
    })
  }, [income])
  let diff = ((monthIncome.currentMonth - monthIncome.lastMonth) / monthIncome.lastMonth * 100).toFixed(2)
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        linkName: "See all users",
        link: "/users",
        total: userList?.length < 10 ? '0' + userList?.length : userList?.length,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        linkName: "View all orders",
        link: "/users",
        total: orderList?.length < 10 ? '0' + orderList?.length : orderList?.length,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "SALES",
        isMoney: true,
        linkName: "View net sales",
        link: "/users",
        total: income.map(earn => earn._id === new Date().getMonth() + 1 && earn.total),
        diff,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        linkName: "See details",
        link: "/users",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "₹"} {data.total}
        </span>
        <Link to={data?.link} className="link">{data?.linkName}</Link>
      </div>
      <div className="right">
        <div className={diff < 0 ? "percentage negative" : "percentage positive"}>
          {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          {data.diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
