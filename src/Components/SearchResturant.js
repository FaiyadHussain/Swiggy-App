import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function SearchRestaurant() {
  const [search, setSearch] = useState("");
  const [Restaurants, setRestaurants] = useState([]);
  const [ExactRestaurant, setExactRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState("restaurant");

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4400802&lng=78.3489168&str=${search}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=44a77000-fc18-de04-1153-8c87c5aac214`
      )
      .then((res) => {
        if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT) {
          if (
            res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
              ?.cards?.length === 2
          ) {
            setExactRestaurant(
              res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
                ?.cards[0]?.card?.card?.info
            );
            setRestaurants(
              res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
                ?.cards[1]?.card?.card?.restaurants
            );
          } else {
            setExactRestaurant(null);
            setRestaurants(
              res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
                ?.cards
            );
          }
        }
      });
  }, [search]);

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
    <div className=" w-[60%] mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mt-4">Search Restaurants</h1>
        <input
          className="border-2 border-black rounded-md w-full p-2 mt-4"
          type="text"
          placeholder="Search for a restaurant or Food"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <Link to={"/searchresturant"}>
          <p
            onClick={() => setActiveTab("restaurant")}
            className={`border-2 rounded-md px-2 ${
              activeTab === "restaurant"
                ? "border-black text-white bg-gray-500" // Active tab with gray background
                : "border-gray-400 text-gray-400 bg-transparent" // Inactive tab with transparent background
            }`}
          >
            Restaurant
          </p>
        </Link>
        <Link to={"/searchdishes"}>
          <p
            onClick={() => setActiveTab("dishes")}
            className={`border-2 rounded-md px-2 ${
              activeTab === "dishes"
                ? "border-black text-black bg-gray-300" // Active tab with gray background
                : "border-gray-400 text-gray-400 bg-transparent" // Inactive tab with transparent background
            }`}
          >
            Dishes
          </p>
        </Link>
      </div>

      {ExactRestaurant !== null && (
        <>
          <h1 className="text-3xl font-bold mt-4">Exact Restaurant</h1>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            <Link
              to={`/restaurantMenu/${ExactRestaurant?.name}/${ExactRestaurant?.id}`}
            >
              <div className="group">
                <div className="aspect-h-1 aspect-w-1 ">
                  <img
                    alt=""
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${ExactRestaurant?.cloudinaryImageId}`}
                    className="h-52 w-80 object-cover rounded-lg object-center"
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-700">
                  {ExactRestaurant?.name}
                </h3>
                <p className="inline-flex text-lg font-semibold items-center gap-2">
                  <FaStar
                    className={getStarColor(ExactRestaurant?.avgRating)}
                  />
                  {ExactRestaurant?.avgRating
                    ? ExactRestaurant?.avgRating
                    : "No Rating"}
                  <span className="text-sm font-semibold">
                    {ExactRestaurant?.sla?.slaString}
                  </span>
                </p>

                <p>{ExactRestaurant?.cuisines?.slice(0, 3).join(",")}</p>
                <p className="text-sm font-semibold text-gray-400">
                  {ExactRestaurant?.areaName}
                </p>
              </div>
            </Link>
          </div>
        </>
      )}

      {search !== "" && (
        <>
          <h1 className="text-3xl font-bold mt-4">
            More Restaurants like thiz
          </h1>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
            {ExactRestaurant === null
              ? Restaurants?.map((product, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0  mt-4 group hover:scale-95  transition-transform duration-300"
                  >
                    <Link
                      to={`/restaurantMenu/${product?.card?.card?.info?.name}/${product?.card?.card?.info?.id}`}
                    >
                      <div className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                          <img
                            alt={product.imageAlt}
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${product?.card?.card?.info?.cloudinaryImageId}`}
                            className="h-44 w-full object-cover object-center"
                          />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-gray-700">
                          {product?.card?.card?.info?.name}
                        </h3>
                        <p className="inline-flex text-lg font-semibold items-center gap-2">
                          <FaStar
                            className={getStarColor(
                              product?.card?.card?.info?.avgRating
                            )}
                          />
                          {product?.card?.card?.info?.avgRating
                            ? product?.card?.card?.info?.avgRating
                            : "No Rating"}
                          <span className="text-sm font-semibold">
                            {product?.card?.card?.info?.sla?.slaString}
                          </span>
                        </p>

                        <p>
                          {product?.card?.card?.info?.cuisines
                            .slice(0, 3)
                            .join(",")}
                        </p>
                        <p className="text-sm font-semibold text-gray-400">
                          {product?.card?.card?.info?.areaName}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))
              : Restaurants?.map((product, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0  mt-4 group hover:scale-95  transition-transform duration-300"
                  >
                    <Link
                      to={`/restaurantMenu/${product?.info?.name}/${product?.info?.id}`}
                    >
                      <div className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                          <img
                            alt={product.imageAlt}
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${product?.info?.cloudinaryImageId}`}
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
                            {product?.info?.sla?.slaString}
                          </span>
                        </p>

                        <p>{product?.info?.cuisines?.slice(0, 2).join(",")}</p>
                        <p className="text-sm font-semibold text-gray-400">
                          {product?.info?.areaName}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchRestaurant;
