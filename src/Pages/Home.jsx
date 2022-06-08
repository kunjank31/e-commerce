import React from "react";
import Featured from "../Components/Featured";
import Layout from "../Components/Layout";
import PopularPoduct from "../Components/PopularPoduct";
import Slider from "../Components/Slider";

const Home = () => {
  return (
    <>
      <Layout>
        <Slider />
        <Featured />
        <PopularPoduct />
      </Layout>
    </>
  );
};

export default Home;
