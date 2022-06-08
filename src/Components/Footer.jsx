import {
  Facebook,
  Instagram,
  LocalPhone,
  LocationOn,
  MailOutlined,
  Pinterest,
  Twitter,
} from "@mui/icons-material";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 2xl:gap-9 md:gap-5">
        <div className="first-col p-5">
          <h2 className="text-[40px] font-bold">ShopKaro</h2>
          <p className="font-light my-3">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </p>
          <div className="flex text-white mt-2">
            <Facebook className="bg-[#0984e3] socialIcons rounded-full p-2 mr-3" />
            <Instagram className="bg-[#E4405F] socialIcons rounded-full p-2 mx-3" />
            <Twitter className="bg-[#3498db] socialIcons rounded-full p-2 mx-3" />
            <Pinterest className="bg-[#d63031] socialIcons rounded-full p-2 mx-3" />
          </div>
        </div>
        <div className="second-col  p-5">
          <h2 className="text-[20px] font-bold">Useful Links</h2>
          <div className="flex justify-between mt-10 font-normal 2xl:w-[70%] md:w-[90%] w-full">
            <ul className="space-y-1">
              <li>Home</li>
              <li>Man Fashion</li>
              <li>Accessories</li>
              <li>Order Tracking</li>
              <li>Wishlist</li>
            </ul>
            <ul className="space-y-1">
              <li>Cart</li>
              <li>Woman Fashion</li>
              <li>My Account</li>
              <li>Wishlist</li>
              <li>Terms </li>
            </ul>
          </div>
        </div>
        <div className="third-col bg-[#fcf5f5] sm:bg-opacity-0 p-5">
          <h2 className="text-[20px] font-bold">Contact</h2>
          <div className="mt-10">
            <p>
              <LocationOn />
              <span className="ml-3">
                622 Dixie Path , South Tobinchester 98336
              </span>
            </p>
            <p className="my-5">
              <LocalPhone />
              <span className="ml-3">+1 234 56 78</span>
            </p>
            <p>
              <MailOutlined />
              <span className="ml-3">contact@kunjankoiri.com</span>
            </p>
            <p className="mt-5">
              <img
                src="https://i.ibb.co/Qfvn4z6/payment.png"
                alt=""
                className="2xl:w-[50%] md:w-full xl:w-[50%]"
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
