import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useLocation, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { productFetch } from "../http/api-http";
import ProductCard from "../Components/ProductCard";

const ProductList = () => {
  const { cat } = useParams();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  const location = useLocation();
  let searchQuery = location.search.split("=")[1];
  const arr = ["%20", "%", "+", "_", "-", "="];
  for (let key of arr) {
    searchQuery = searchQuery?.split(key).join(" ");
  }

  const filterProduct = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await productFetch();
        setProducts(data);
        // setFilterProducts(d)
        // let tshirts = ProductShow(data)
      } catch ({ response: data }) {
        toast.error(data.message);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    let d = products.filter((d) => d.name === searchQuery);
    if (searchQuery) {
      setFilterProducts(d);
    } else if (filter) {
      d = products.filter((product) =>
        Object.entries(filter).every(([key, value]) =>
          product[key].includes(value)
        )
      );
      setFilterProducts(d);
    }
  }, [searchQuery, filter,products]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Layout>
        {searchQuery && (
          <h2 className="p-5 text-2xl font-bold">Search for {searchQuery}</h2>
        )}
        <div className="sm:flex justify-between items-center p-5">
          <div className="filterProduct flex items-center">
            <h2 className="font-bold text-xl">Filter Products:</h2>
            <select
              onChange={filterProduct}
              name="color"
              className="mx-5 border-[1px] border-gray-900 rounded-sm p-2 text-sm capitalize"
              id=""
              value={filter.color}
            >
              <option value="" disabled>
                Color
              </option>
              {/* {Object.keys(products).map((product) => {
                return products[product].color.map((c, i) => {
                  return <option value={c} key={i}>{c}</option>
                })
              })} */}
              {products.map((product, i) => {
                return (
                  <option value={product.color} key={i}>
                    {product.color}
                  </option>
                );
              })}
            </select>
            <select
              onChange={filterProduct}
              name="size"
              value={filter.size}
              className="border-[1px] border-gray-900 rounded-sm p-2 text-sm uppercase"
              id=""
            >
              <option value="" defaultValue>
                Size
              </option>
              {products.map((product, i) => {
                return (
                  <option value={product.size} key={i}>
                    {product.size}
                  </option>
                );
              })}
            </select>
            {/* <NavLink to="/product-list">Clear Filter</NavLink> */}
          </div>
          <div className="sortProduct flex items-center">
            <h2 className="font-bold text-xl">Sort Products:</h2>
            <select
              onChange={(e) => setSort(e.target.value)}
              name="sort"
              className="border-[1px] border-gray-900 rounded-sm p-2 mx-5 text-sm"
              id=""
            >
              <option value="" disabled>
                Color
              </option>
              <option value="newest">Newest</option>
              <option value="asc">Price (asc)</option>
              <option value="dsc">Price (desc)</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap">
          {filterProducts.length > 0
            ? filterProducts.map((product, i) => {
                return <ProductCard product={product} key={i} />;
              })
            : products.map((product, i) => {
                return cat ? (
                  product.category.includes(cat) && (
                    <ProductCard product={product} key={i} />
                  )
                ) : (
                  <ProductCard product={product} key={i} />
                );
              })}
        </div>
      </Layout>
    </>
  );
};

export default ProductList;
