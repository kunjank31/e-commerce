// import "./userList.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import "../../components/datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productDelete, productFetch } from "../../http/api-http";
import toast, { Toaster } from "react-hot-toast";
import { getStorage, ref, deleteObject } from "firebase/storage";
import app from '../../firebase'

const ProductList = () => {
    const [product, setProduct] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            try {
                const { data } = await productFetch()
                setProduct(data)
            } catch ({ response: { data } }) {
                toast.error(data.message)
            }
        })()
    }, [])

    const handleDelete = async (params) => {

        const storage = getStorage(app);
        try {
            params.row.productImg.map(img => {
                let split = img.split('https://firebasestorage.googleapis.com/v0/b/e-commerce-55276.appspot.com/o/images%2F').join("")
                split = split.split("?alt")
                const desertRef = ref(storage, 'images/' + split[0])
                deleteObject(desertRef).then(() => {
                    toast.success("This product image deleted")
                }).catch(error => {
                    toast.error(error.message)
                })
            })
            const { data } = await productDelete(params.row.id)

            toast.success(data.message)

            setTimeout(() => {
                window.onload = () => {

                    navigate('/products')
                }
            }, 1000);
        } catch ({ response: { data } }) {
            toast.error(data.message)
        }

    };
    const userColumns = [
        { field: "id", headerName: "ID", width: 250 },
        {
            field: "brand",
            headerName: "Brand",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellWithImg">
                        {params.row.brand}
                    </div>
                );
            },
        },
        {
            field: "name",
            headerName: "Name",
            width: 230,
            renderCell: (params) => {
                return (
                    <div className="cellWithImg">
                        {params.row.name}
                    </div>
                );
            },
        },
        {
            field: "isStock",
            headerName: "in Stock",
            width: 160,
            renderCell: (params) => {
                return (
                    <div className={`cellWithStatus ${params.row.status}`}>
                        {params.row.isStock === true ? 'Yes' : "No"}
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
                        <Link to={"/products/" + params.row.id} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="list">
            <Toaster position="top-right" reverseOrder={false} />
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        Add New Product
                        <Link to="/products/new" className="link">
                            Add New
                        </Link>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={product}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductList