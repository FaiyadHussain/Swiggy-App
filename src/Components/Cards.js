import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

function Cards({ coordinates }) {
  const [Food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      )
      .then((res) => {
        setFood(res?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info);
        setLoading(false); // Disable loading after data fetch
      });
  }, [coordinates]);

  const handleNext = () => {
    value >= 189 ? setValue(189) : setValue((prev) => prev + 38);
  };

  const handlePrev = () => {
    value <= 0 ? setValue(0) : setValue((prev) => prev - 38);
  };

  const Shimmer = () => (
    <div className=" h-64 flex flex-col items-center bg-slate-900 mb-20 p-10">
      <div className="relative flex justify-center items-center h-[350px]">
        <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
        <img
          className="absolute w-10 h-10"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
          alt="Swiggy logo"
        />
      </div>
      <h1 className="text-4xl text-white">
        Looking for great food near you...
      </h1>
    </div>
  );

  return (
    <div>
      {" "}
      {loading ? (
        <Shimmer />
      ) : (
        <div className="w-3/4 mx-auto mt-4 overflow-hidden h-96">
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-extrabold">What's on your mind?</h1>
              <div className="flex gap-2">
                <div
                  onClick={handlePrev}
                  className="cursor-pointer rounded-full bg-gray-200 p-1"
                >
                  <IoArrowBack />
                </div>
                <div
                  onClick={handleNext}
                  className="cursor-pointer rounded-full bg-gray-200 p-1"
                >
                  <IoArrowForward />
                </div>
              </div>
            </div>
            <div
              style={{ transform: `translateX(-${value}%)` }}
              className="flex duration-300"
            >
              {Food?.map((item, i) => (
                <Link
                  to={`/CardMenu/${item?.title}/${item?.id}`}
                  key={i}
                  className="flex-shrink-0 w-1/7 p-1 mt-4"
                >
                  <img
                    className="w-40 rounded-lg"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.imageId}`}
                    alt={item?.title}
                  />
                </Link>
              ))}
            </div>
            <hr className="mt-6" />
          </>
        </div>
      )}
    </div>
  );
}

export default Cards;
