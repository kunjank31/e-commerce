import "./singleUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast'
import { singleUser } from "../../http/api-http";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  const { userId } = useParams()
  const [user, setUser] = useState({})
  useEffect(() => {
    (async () => {
      try {
        const { data } = await singleUser(userId)
        setUser(data)
      } catch ({ response: { data } }) {
        console.log(data)
        toast.error(data.message)
      }
    })()
  }, [userId])
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <img
                  src={user.image || '/user-icon.png'}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{user.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{user.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{user.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      {user.address}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">INDIA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
            </div>
          </div>
          <div className="bottom">
            <h1 className="title">Last Transactions</h1>
            <List />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
