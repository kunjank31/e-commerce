import { CurrencyRupeeOutlined } from "@mui/icons-material";
import React from "react";

const Accounment = () => {
  return (
    <>
      <p className="bg-teal-700 py-[2px] text-center text-white">
        Super Deal! Free Shipping on Order Over
        <CurrencyRupeeOutlined className="currency cartCeckout" />
        500
      </p>
    </>
  );
};

export default Accounment;
