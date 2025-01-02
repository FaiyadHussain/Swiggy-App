// SearchDishes.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { addToCart } from "./Reducer";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SearchDishes() {
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4400802&lng=78.3489168&str=${search}&trackingId=undefined&submitAction=ENTER&queryUniqueId=ca695039-e861-0903-c8bf-c205a4cdd78d`
      )
      .then((res) => {
        if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH) {
          setDishes(
            res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.splice(
              1
            )
          );
        }
      });
  }, [search]);

  const handleViewInfo = (dish) => {
    setSelectedDish(dish);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDish(null);
  };

  return (
    <div className="w-3/6 mx-auto">
      {/* Search input */}
      <div className="text-center mt-8">
        <h1 className="text-2xl font-bold">Search Dishes</h1>
        <input
          className="border-2 border-black rounded-md w-full p-2 mt-4"
          type="text"
          placeholder="Search Dishes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Scrollable Dishes container */}
      <div className="mt-8 h-96 overflow-y-scroll border-t border-gray-200">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8">
          {dishes?.map((product) => (
            <div
              key={product.id}
              className="group border rounded-lg p-4 shadow-md"
            >
              <div className="aspect-w-1 aspect-h-1 w-full h-40 overflow-hidden rounded-lg bg-gray-200">
                <img
                  alt={product.imageAlt}
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${product?.card?.card?.info?.imageId}`}
                  className="h-44 w-96 object-cover object-center"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {product?.card?.card?.info?.name}
              </h3>
              <p className="text-gray-600">
                {product?.card?.card?.info?.category}
              </p>
              <p className="text-gray-500">
                {product?.card?.card?.info?.description?.slice(0, 50)}...
              </p>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-semibold">
                  ₹{product?.card?.card?.info?.price / 100}
                </p>
                <button
                  className="border border-black border-solid p-1 px-2 rounded-2xl"
                  onClick={() => handleViewInfo(product)}
                >
                  View info
                </button>
                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        Name: product?.card?.card?.info?.name,
                        Price: product?.card?.card?.info?.price
                          ? product?.card?.card?.info?.price / 100
                          : product?.card?.card?.info?.defaultprice / 100,
                        Image: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${product?.card?.card?.info?.imageId}`,
                      })
                    );

                    toast.success("Item added to cart", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedDish && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              X
            </button>
            <div className="mt-4">
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${selectedDish?.card?.card?.info?.imageId}`}
                alt={selectedDish?.card?.card?.info?.name}
                className="w-full h-56 object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4">
                {selectedDish?.card?.card?.info?.name}
              </h2>
              <p className="text-gray-700">
                ₹{selectedDish?.card?.card?.info?.price / 100}
              </p>
              <p className="text-gray-500 mt-2">
                {selectedDish?.card?.card?.info?.description}
              </p>
              <p className="text-gray-600 mt-4">
                {selectedDish?.card?.card?.info?.category}
              </p>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default SearchDishes;
