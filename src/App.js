import React from "react";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import "./App.css";
import Cards from "./Components/Cards";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardsMenu from "./Components/CardMenu";
import ResturantMenu from "./Components/RestaurantMenu";
import SearchResturant from "./Components/SearchResturant";
import SearchDishes from "./Components/SearchDishes";
import PopularRes from "./Components/PopularRes";
import Restaurants from "./Components/Restaurants";
import Buttons from "./Components/Buttons";
import Footer from "./Components/Footer";

import AddtoCard from "./Components/AddtoCard";

function App() {
  const [coordinates, setCoordinates] = useState({
    lat: 17.4485835,
    lng: 78.39080349999999,
  });
  return (
    <div className="w-full">
      <BrowserRouter>
        <Navbar coordinates={coordinates} setCoordinates={setCoordinates} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Cards coordinates={coordinates} />
                <PopularRes coordinates={coordinates} />
                <Restaurants coordinates={coordinates} />{" "}
                <Buttons coordinates={coordinates} />{" "}
                <Footer coordinates={coordinates} />
              </>
            }
          />
          <Route path="/CardMenu/:title/:id" element={<CardsMenu />} />
          <Route
            path="/restaurantMenu/:restName/:restId"
            element={<ResturantMenu />}
          />
          <Route path="/searchresturant" element={<SearchResturant />} />
          <Route path="/searchdishes" element={<SearchDishes />} />
          <Route path="/cart" element={<AddtoCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
