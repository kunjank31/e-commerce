import React, { useEffect, useState } from "react";
import { Add, CurrencyRupeeOutlined, Remove } from "@mui/icons-material";

import Layout from "../Components/Layout";
// import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productFetch, singleProduct } from "../http/api-http";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch} from "react-redux";
import { setCart } from "../Store/slices/cartSlice";
const Product = () => {
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState({});
  const [variant, setVariant] = useState({});
  const { slug } = useParams();
  const adjustment = (type) => {
    if (type === "add") {
      setQty(qty === 10 ? qty - 1 : qty + 1);
    } else {
      setQty(qty <= 0 ? qty + 1 : qty - 1);
    }
  };
  const [color, setColor] = useState('');
  const [size, setSize] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      try {
        const { data } = await singleProduct(slug)
        const { data: variants } = await productFetch(data.name)
        let colorSizeSlug = {}  //red:{xl:{slug:"red-xl-product"}}

        for (let item of variants) {
          if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
          } else {
            colorSizeSlug[item.color] = {}
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
          }
        }
        setVariant(colorSizeSlug)
        setProduct(data)
        setSize([data.size])
      } catch ({ response: { data } }) {
        toast.error(data.message)
      }
    })()
  }, [slug])

  const colorFun = (type) => {

    if (Object.keys(variant).includes(type)) {
      setSize(Object.keys(variant[type]))
      setColor(type)
    }
  }
  const addToCartFun = () => {
    dispatch(setCart(product))
  }
  const refresh = (newColor, newSize) => {
    let url = `/products/${variant[newColor][newSize].slug}`
    return navigate(url)
  }
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Layout>
        <div className="m-5 sm:flex sm:m-10 sm:space-x-14">
          <img
            src={product.productImg}
            alt=""
            className="2xl:w-[92vh] sm:w-[50vw]"
          />
          <div className="">
            <h2 className="text-gray-600 font-semibold mb-2">{product.brand}</h2>
            <h2 className="text-4xl mt-3 sm:m-0 font-light">
              {product.name}
            </h2>
            <p className="my-5">{product.productDetails}</p>
            <h3 className="text-4xl font-semibold flex items-center mb-8">
              <CurrencyRupeeOutlined className="currency" />{product.price}
            </h3>
            <div className="sm:flex flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <p className="text-xl font-light mr-2">Color</p>
                {Object.keys(variant).map((variant, i) => {
                  return <div key={i} onClick={() => colorFun(variant)} className="w-5 h-5 rounded-full border border-black" style={{ background: `${variant}` }}></div>
                })}
              </div>
              <div className="flex items-center">
                <h2 className="font-light text-xl">Size</h2>
                <select
                  name="size"
                  className="border-[1px] border-gray-900 ml-5 rounded-sm p-2 text-sm uppercase"
                  onChange={(e) => refresh(color, e.target.value)}
                  required
                >
                  <option defaultValue>Select</option>
                  {size?.map((size, i) => {
                    return <option value={size} key={i}>{size}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="xl:flex items-center justify-between mt-8">
              <div className="flex mb-5 items-center">
                <Remove onClick={() => adjustment("remove")} />
                <span className="number border-[1px] border-teal-600 px-3 py-1 rounded-lg font-bold mx-2">
                  {qty}
                </span>
                <Add onClick={() => adjustment("add")} />
              </div>
              <button
                className="border-teal-600 border-2 sm:py-3 xl:px-5 px-3 py-2"
                onClick={addToCartFun}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Product
