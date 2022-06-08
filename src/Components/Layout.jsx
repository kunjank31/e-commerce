import React from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import Accounment from "./Accounment";
import Footer from "./Footer";
import NewsLetter from "../Components/NewsLetter";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <Accounment />
      {children}
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Layout;
