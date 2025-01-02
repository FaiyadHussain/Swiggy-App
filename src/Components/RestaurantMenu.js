import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "./Reducer"; // import the addToCart action
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RestaurantMenu() {
  let params = useParams();
  const [menu, setMenu] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4400802&lng=78.3489168&restaurantId=${params.restId}&catalog_qa=undefined&submitAction=ENTER`
      )
      .then((res) => {
        setMenu(
          res?.data?.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR?.cards?.splice(
            1
          )
        );
      });
  }, [params.restId]);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="w-3/4 mx-auto mb-12">
      <div>
        <h1 className="text-2xl font-extrabold mt-4 mb-12">
          {params.restName}
        </h1>
      </div>
      {menu?.map((item, i) => {
        if (item?.card?.card?.itemCards) {
          return (
            <div id="accordionFlushExample" className="space-y-4" key={i}>
              <div className="accordion-item border-b border-gray-200">
                <h2 className="accordion-header mb-0">
                  <button
                    className="accordion-button collapsed w-full py-4 px-5 text-left bg-white border border-gray-300 focus:outline-none flex justify-between items-center"
                    type="button"
                    onClick={() => toggleAccordion(i)}
                  >
                    <b>
                      {item?.card?.card?.title} -{" "}
                      {item?.card?.card?.itemCards.length}
                    </b>
                    <span>
                      {openAccordion === i ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  </button>
                </h2>
                <div
                  id={`flush-collapse${i}`}
                  className={`accordion-collapse ${
                    openAccordion === i ? "block" : "hidden"
                  }`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body p-5">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {item?.card?.card?.itemCards?.map((product) => (
                        <div key={product.id} className="">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                              alt={product.imageAlt}
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${product?.card?.info?.imageId}`}
                              className="h-48 w-64 object-cover object-center"
                            />
                          </div>
                          <h3 className="mt-4 text-sm text-gray-700">
                            {product?.card?.info?.name}
                          </h3>
                          <p>
                            ₹
                            {product?.card?.info?.price
                              ? product?.card?.info?.price / 100
                              : product?.card?.info?.defaultPrice / 100}
                          </p>
                          <p>
                            {
                              product?.card?.info?.ratings?.aggregatedRating
                                ?.rating
                            }
                          </p>
                          <button
                            onClick={() =>
                              dispatch(
                                addToCart({
                                  Name: product?.card?.info?.name,
                                  Price: product?.card?.info?.price
                                    ? product?.card?.info?.price / 100
                                    : product?.card?.info?.defaultPrice / 100,
                                  Image: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${product?.card?.info?.imageId}`,
                                })
                              ) &&
                              toast.success("Item added to cart", {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              })
                            }
                            className="border bg-green-500 text-white rounded px-4 py-2 mt-2"
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}

      <ToastContainer />
    </div>
  );
}

export default RestaurantMenu;
