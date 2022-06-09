import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Featured = () => {
  const { income } = useSelector(state => state.ProductnOrder)
  const [monthIncome, setMonthIncome] = useState({})
  useEffect(() => {
    income.filter(earn => {
      if (earn._id === new Date().getMonth() + 1) setMonthIncome(prev => { return { ...prev, currentMonth: earn.total } })
      if (earn._id === new Date().getMonth()) setMonthIncome(prev => { return { ...prev, lastMonth: earn.total } })
    })
  }, [income])
  let diff = ((monthIncome.currentMonth - monthIncome.lastMonth) / monthIncome.lastMonth * 100).toFixed(2)
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={diff} text={diff + '%'} strokeWidth={5} styles={diff < 0 ?{path:{stroke:"red"},text:{fill:"red"}}:{path:{stroke:"green"},text:{fill:"green"}}} />
        </div>
        <p className="title">Total sales made this month</p>
        <p className="amount">₹ {monthIncome.currentMonth}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Magin</div>
            <div className={diff < 0 ? "itemResult negative" : "itemResult positive"}>
              {diff < 0 ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowUpOutlinedIcon fontSize="small" />}
              <div className="resultAmount">10%</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className={diff < 0 ? "itemResult negative" : "itemResult positive"}>
              {diff < 0 ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowUpOutlinedIcon fontSize="small" />}
              <div className="resultAmount">₹ {monthIncome.lastMonth}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
