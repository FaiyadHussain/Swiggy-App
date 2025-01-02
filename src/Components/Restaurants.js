import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function Restaurants({ coordinates }) {
  const [Restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      )
      .then((res) => {
        setRestaurants(
          res.data.data.cards[1].card.card.gridElements.infoWithStyle
            .restaurants
        );
      });
  }, [coordinates]);

  const getStarColor = (rating) => {
    if (rating > 4.5) {
      return "text-green-500";
    } else if (rating >= 4) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };
  return (
    <div className="w-3/4 mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold ">
          Restaurants with online food delivery in Hyderabad
        </h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-12">
          {Restaurants.map((product) => (
            <Link
              to={`/restaurantMenu/${product?.info?.name}/${product?.info?.id}`}
            >
              {" "}
              <div
                key={product.id}
                href={product.href}
                className="group hover:scale-95  transition-transform duration-300"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                  <img
                    alt={product.imageAlt}
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${product.info.cloudinaryImageId}`}
                    className="h-64 w-full object-cover object-center "
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-700">
                  {product.info.name}
                </h3>
                <p className="flex text-lg font-semibold items-center gap-2">
                  <FaStar className={getStarColor(product?.info?.avgRating)} />
                  {product?.info?.avgRating
                    ? product?.info?.avgRating
                    : "No Rating"}
                  .{" "}
                  <span>
                    {" "}
                    <p className="text-sm font-semibold">
                      {product.info.sla.slaString}
                    </p>
                  </span>
                </p>

                <p>{product.info.cuisines.slice(0, 3).join(", ")}</p>
                <p className="text-sm font-semibold text-gray-400 ">
                  {product.info.areaName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <hr className="mt-12" />
    </div>
  );
}

export default Restaurants;
