import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./Reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddtoCard = () => {
  const cart = useSelector((state) => state.CartItems);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = cart
    .reduce((total, item) => total + parseFloat(item.Price), 0)
    .toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-6 flex justify-between ">
        <h1 className="text-3xl font-bold mb-6">Cart Items ({cart.length})</h1>
        <h2 className="text-xl font-semibold">Total Price: ₹{totalPrice}</h2>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
        {cart.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden">
              <img
                alt={item.Name}
                src={item.Image}
                className="h-56 w-64 object-cover object-center group-hover:opacity-75 transition-opacity "
              />
            </div>
            <div className="p-4">
              <h3 className="mt-2 text-lg font-semibold text-gray-800">
                {item.Name}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-900 text-left">
                {item.Price}
              </p>
              <button
                className="mt-4 w-full transition-transform transform hover:scale-105 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => {
                  dispatch(removeFromCart(i));
                  toast("Removed from cart", {
                    position: "bottom-right",
                    style: { backgroundColor: "red", color: "white" },
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddtoCard;
