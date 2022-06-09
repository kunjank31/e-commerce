import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getProductStats, getUserStats } from "../../http/api-http";

const Chart = ({ aspect, title, productId }) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Auguest",
    "September",
    "October",
    "November",
    "December",
  ];
  const [stats, setStats] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = productId
          ? await getProductStats("?productId=" + productId)
          : await getUserStats();
        setStats(data);
      } catch ({ response: { data } }) {
        console.log(data);
        toast.error(data.message);
      }
    })();
  }, [productId]);
  let data;
  useMemo(() => {
    data = stats?.map((stat) => {
      return { Name: month[stat["_id"] - 1], Total: stat["total"] };
    });
  }, [stats]);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="Name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
