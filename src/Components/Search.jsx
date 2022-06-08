import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import { productFetch } from "../http/api-http";

const Search = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState([]);
  const [products, setProducts] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const { data } = await productFetch()
        setProducts(data)
      } catch ({ response: { data } }) {
        console.log(data)
      }
    })()
  }, [])

  const handleKeyup = (e) => {
    if (e.target.value) {
      e.key === "Enter" &&
        navigate(`/products?search=${e.target.value}`);
      const data = products.filter(
        (f) =>
          f.name.toLocaleLowerCase().includes(e.target.value) ||
          f.brand.toLocaleLowerCase().includes(e.target.value) ||
          f.category.includes(e.target.value)
      );
      setKey(data.map((d) => d.name));
    } else {
      setKey([]);
    }
  };
  return (
    <>
      <div className="relative w-full">
        <div className="flex">
          <input
            type="search"
            name="search"
            id=""
            placeholder="Search your favorite brand..."
            className="w-full py-2 px-5 border-[1px] outline-none rounded-sm text-black bg-transparent"
            onKeyUp={handleKeyup}
            autoComplete="on"
          />
          <SearchOutlined className="searchIcon p-1 bg-yellow-600 rounded-md text-black" />
        </div>
        <ul className="w-full bg-white absolute z-20 text-black shadow-md rounded-b-sm">
          {key.map((k, i) => (
            <li
              className="px-5 py-2 hover:bg-[#00000014] cursor-pointer"
              onClick={() => navigate(`/products?search=${k}`)}
              key={i}
            >
              {k}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
