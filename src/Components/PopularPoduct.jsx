import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { productFetch } from "../http/api-http";
import ProductCard from "./ProductCard";
import toast, { Toaster } from "react-hot-toast";
import ProductShow from "../hooks/ProductShow";


const PopularPoduct = ({ filter, cat, sort }) => {
  const location = useLocation();
  let searchQuery = location.search.split("=")[1];
  const arr = ["%20", "%", "+", "_", "-", "="];
  for (let key of arr) {
    searchQuery = searchQuery?.split(key).join(" ");
  }
  const [filterProducted, setFilterProducted] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productFetch()
        const tshirts = ProductShow(data)
        setProducts(tshirts)
      } catch ({ response: data }) {
        toast.error(data.message)
      }
    })()
  }, [])


  return (
    <>
      <Toaster position="top left" reverseOrder={false} />
      {searchQuery && (
        <h2 className="px-5 py-5 text-2xl font-bold">
          Search for {searchQuery}
        </h2>
      )}
      <div className="wrapper sm:p-5 sm:flex sm:justify-between sm:flex-wrap">
        {filter || sort || cat || searchQuery
          ? filterProducted.map((p) => {
            return <ProductCard product={p} key={p._id} />;
          })
          : products && Object.keys(products).map((product, i) => {
            return <ProductCard product={products[product]} key={i} />;
          })}
      </div>
    </>
  );
};

export default PopularPoduct;
