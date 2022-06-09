import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useInput from "../../hooks/useInput";
import { productCreate } from "../../http/api-http";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { CloudUpload } from "@mui/icons-material/";
import Loading from "../../components/Loading/Loading";

const NewProduct = () => {
  const [file, setFile] = useState("");
  const [uplaoded, setUploaded] = useState(false);
  const [brand, bindBrand, resetBrand] = useInput("");
  const [name, bindName, resetName] = useInput("");
  const [productDetails, bindProductDetails, resetProductDetails] =
    useInput("");
  const [slug, setSlug] = useState("");
  const [productImg, setProductImg] = useState([]);
  const [size, bindSize, resetSize] = useInput("");
  const [category, bindCategory, resetCategory] = useInput("");
  const [color, bindColor, resetColor] = useInput("");
  const [price, bindPrice, resetPrice] = useInput("");
  const [isStock, bindIsStock, resetIsStock] = useInput("");
  const storage = getStorage(app);

  const uploadImage = (e) => {
    e.preventDefault();
    setUploaded(true)
    const promises = []
    Array.from(file).forEach((image) => {
      const fileName = `${Date.now()}_${image.name}`;
      const storageRef = ref(storage, "images/" + fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask)
      uploadTask.on(
        "state_changed",
        () => {
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProductImg((prev) => [...prev, downloadURL]);
          });
        }
      );
    });
    Promise.all(promises).then(() => setUploaded(false)).catch(err => toast.error(err))
  };
  const sumbit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await productCreate({
        brand,
        name,
        productDetails,
        slug,
        category,
        size,
        color,
        productImg,
        price: parseInt(price),
        // isStock,
      });
      if (data) {
        resetBrand();
        resetCategory();
        resetColor();
        resetIsStock();
        resetName();
        resetBrand();
        resetSize();
        resetPrice();
        resetProductDetails();
        setSlug("");
        setFile("");
        return toast.success("Product has been created!");
      }
    } catch ({
      response: {
        data: { message },
      },
    }) {
      return toast.error(message);
    }
  };
  return (
    <>
      {uplaoded ? (
        <Loading text={`Uploading... ${productImg.length}/${file.length}`} />
      ) : (
        <div className="newProduct">
          <Toaster position="top-right" reverseOrder={false} />
          <Sidebar />
          <div className="newContainer">
            <Navbar />
            <div className="">
              <div className="top">
                <h1>Add New Product</h1>
              </div>
              <form className="addProductForm">
                <div className="addProductItem">
                  <div className="box">
                    <input
                      type="file"
                      id="file"
                      multiple
                      onChange={(e) => setFile(e.target.files)}
                    />
                    <label htmlFor="file">
                      <CloudUpload
                        style={{ fontSize: "6rem", color: "#6439ff" }}
                      />
                    </label>
                    {file && (
                      <div className="imageContainer">
                        {Array.from(file).map((imgObj, i) => {
                          return (
                            <img
                              src={URL.createObjectURL(imgObj)}
                              alt=""
                              key={i}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="addProductItem">
                    <label>Brand</label>
                    <input type="text" placeholder="Levis" {...bindBrand} />
                  </div>
                  <div className="addProductItem">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Apple Airpods"
                      {...bindName}
                    />
                  </div>
                  <div className="addProductItem">
                    <label>Product Details</label>
                    <input
                      type="text"
                      placeholder="About this product..."
                      {...bindProductDetails}
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="addProductItem">
                    <label>Slug</label>
                    <input
                      type="text"
                      placeholder="product-name-color-size-id"
                      onChange={(e) =>
                        setSlug(
                          e.target.value
                            .toLocaleLowerCase()
                            .split(" ")
                            .join("-")
                        )
                      }
                    />
                  </div>
                  <div className="addProductItem">
                    <label>Category</label>
                    <input
                      type="text"
                      placeholder="Category"
                      {...bindCategory}
                    />
                  </div>
                  <div className="addProductItem">
                    <label>Size</label>
                    <input type="text" placeholder="Size" {...bindSize} />
                  </div>
                </div>
                <div className="flex">
                  <div className="addProductItem">
                    <label>Price</label>
                    <input type="number" placeholder="123" {...bindPrice} />
                  </div>
                  <div className="addProductItem">
                    <label>Color</label>
                    <input type="text" placeholder="Color" {...bindColor} />
                  </div>
                  <div className="addProductItem">
                    <label>Stock</label>
                    <select name="active" id="active" {...bindIsStock}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                {productImg.length <= 0 && <button
                  className="addProductButton upload"
                  onClick={uploadImage}
                >
                  Upload
                </button>}
                <button className="addProductButton" onClick={sumbit}>
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewProduct;
