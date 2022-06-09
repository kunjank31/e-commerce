import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { userDelete } from "../../http/api-http";
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from '../../store/slice/productNOrder'

const Datatable = () => {
  const { userList: data, userError } = useSelector((state) => state.ProductnOrder)
  const dispatch = useDispatch()
  useEffect(() => {
    userError && toast.error(userError.message)
  }, [userError])
  const handleDelete = async (id) => {
    try {
      const { data: delData } = await userDelete(id)
      if (delData) {
        toast.success(delData.message)
      }
      const renewal = data.filter(d => d._id !== id)
      dispatch(setUserList(renewal))
      console.log(renewal)
    } catch ({ response: { data } }) {
      toast.error(data)
    }
  };

  const userColumns = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image || "/user-icon.png"} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },

    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.isAdmin === true ? 'Admin' : "User"}
          </div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/users/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
