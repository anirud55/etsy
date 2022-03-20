
import React from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import ENavbar from "../components/ENavbar";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      {/* <Annonuncement /> */}
      <ENavbar />
      <Slider />
      <Categories />
      <Products/>
      <Footer/>
    </div>
  )
}

export default Home