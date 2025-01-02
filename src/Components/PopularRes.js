import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

function PopularRes({ coordinates }) {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [value, setValue] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      )
      .then((res) => {
        setPopular(
          res.data.data.cards[1].card.card.gridElements.infoWithStyle
            .restaurants
        );
        setLoading(false); // Set loading to false after data fetch
      });
  }, [coordinates]);

  const handleNext = () => {
    value >= 290 ? setValue(289) : setValue((prev) => prev + 30);
  };

  const handlePrev = () => {
    value <= 0 ? setValue(0) : setValue((prev) => prev - 30);
  };

  const getStarColor = (rating) => {
    if (rating > 4.5) {
      return "text-green-500";
    } else if (rating >= 4) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };

  // Shimmer placeholder for loading state
  const ShimmerCard = () => (
    <div className="flex-shrink-0 w-1/5 p-1 mt-4 animate-pulse">
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 rounded-lg h-44"></div>
      <div className="mt-4 bg-gray-200 h-6 w-3/4 rounded-md"></div>
      <div className="mt-2 bg-gray-200 h-4 w-1/2 rounded-md"></div>
      <div className="mt-2 bg-gray-200 h-4 w-1/4 rounded-md"></div>
    </div>
  );

  return (
    <div className="w-3/4 mx-auto overflow-hidden h-full -m-16 mb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">
          Top restaurant chains in Hyderabad
        </h1>
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
        {loading
          ? Array(5)
              .fill(0)
              .map((_, index) => <ShimmerCard key={index} />)
          : popular?.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/5 p-1 mt-4 group hover:scale-95 transition-transform duration-300"
              >
                <Link
                  to={`/restaurantMenu/${product?.info?.name}/${product?.info?.id}`}
                >
                  <div className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                      <img
                        alt={product.imageAlt}
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${product.info.cloudinaryImageId}`}
                        className="h-44 w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-700">
                      {product?.info?.name}
                    </h3>
                    <p className="inline-flex text-lg font-semibold items-center gap-2">
                      <FaStar
                        className={getStarColor(product?.info?.avgRating)}
                      />
                      {product?.info?.avgRating
                        ? product?.info?.avgRating
                        : "No Rating"}
                      <span className="text-sm font-semibold">
                        {product.info?.sla?.slaString}
                      </span>
                    </p>
                    <p>{product?.info?.cuisines.slice(0, 3).join(",")}</p>
                    <p className="text-sm font-semibold text-gray-400">
                      {product?.info?.areaName}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
      </div>
      <hr />
    </div>
  );
}

export default PopularRes;
