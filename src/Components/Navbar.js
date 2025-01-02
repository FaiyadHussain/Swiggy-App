import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosAlbums, IoIosSearch } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdHelpBuoy, IoMdClose } from "react-icons/io";
import { PiSignInBold } from "react-icons/pi";
import { BsCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";

function Navbar({ coordinates, setCoordinates }) {
  let noOfItems = useSelector((state) => {
    return state.CartItems.length;
  });

  const [visible, setVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleLoginClick = () => {
    setLoginVisible(!loginVisible);
  };

  const fetchSuggestions = async (inputValue) => {
    if (inputValue.length > 2) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${inputValue}&types=`
        );
        setSuggestions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching location suggestions", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleLocationInput = (e) => {
    const inputValue = e.target.value;
    setLocationInput(inputValue);
    debouncedFetchSuggestions(inputValue);
  };

  const getCoordinates = async (placeId) => {
    try {
      const response = await axios.get(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`
      );
      setCoordinates(response.data.data[0].geometry.location);
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const handleSuggestionClick = (description, placeId) => {
    setLocationInput(description);
    getCoordinates(placeId);
    setSuggestions([]);
    setVisible(false);
  };

  useEffect(() => {
    if (locationInput.length > 2) {
      debouncedFetchSuggestions(locationInput);
    }
  }, [locationInput]);

  return (
    <div className="relative">
      {/* Overlay */}
      <div
        className={`fixed w-full h-full bg-black/50 z-40 inset-0 transition-opacity duration-300 ${
          visible || loginVisible
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        onClick={() => {
          setVisible(false);
          setLoginVisible(false);
        }}
      ></div>

      {/* Location Drawer */}
      <div
        className={`fixed top-0 left-0 w-[35%] h-full bg-white z-50 p-6 transition-transform duration-300 ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Choose your Location</h2>
          <IoMdClose
            className="text-2xl cursor-pointer"
            onClick={handleClick}
          />
        </div>
        <input
          type="text"
          value={locationInput}
          onChange={handleLocationInput}
          placeholder="Search for area, street name..."
          className="border p-2 w-full rounded mb-4"
          aria-label="Location search"
        />
        {loading ? (
          <p className="text-sm text-gray-500">Loading suggestions...</p>
        ) : suggestions.length > 0 ? (
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 border-b cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  handleSuggestionClick(
                    suggestion.description.slice(0, 60),
                    suggestion.place_id
                  )
                }
                role="button"
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  handleSuggestionClick(
                    suggestion.description,
                    suggestion.place_id
                  )
                }
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No results found</p>
        )}
      </div>

      {/* Login Drawer */}
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white z-50 p-6 transition-transform duration-300 ${
          loginVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Login</h2>
          <IoMdClose
            className="text-2xl cursor-pointer"
            onClick={handleLoginClick}
          />
        </div>
        <p className="mb-4">
          By clicking on Login, you accept the Terms & Conditions and Privacy
          Policy.
        </p>
        <input
          type="text"
          placeholder="Enter your phone number"
          className="border p-2 w-full rounded mb-4"
        />
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md w-full">
          LOGIN
        </button>
      </div>

      {/* Navbar */}
      <div className="flex justify-around items-center p-4 bg-white shadow-lg">
        <div className="flex items-center gap-10">
          <Link to={"/"}>
            <img
              className="w-12 h-12 rounded-lg"
              src="https://miro.medium.com/v2/resize:fit:1000/1*TCc6vQVH-3EUiJea76pMbQ.png"
              alt="Logo"
            />
          </Link>
          <div onClick={handleClick} className="cursor-pointer">
            <p className="text-md font-semibold">
              <span className="underline px-2">Others</span>
              <span className="text-gray-500 text-sm opacity-50 items-center inline-flex">
                {locationInput || "Gachibowli, Hyderabad, Telangana, in..."}
              </span>
              <IoIosArrowDown className="text-orange-500 ml-1 text-xl inline-flex" />
            </p>
          </div>
        </div>
        <div className="flex space-x-12">
          <p className="text-md font-semibold text-gray-700">
            <IoIosAlbums className="inline-flex mr-2" />
            Swiggy Corporate
          </p>
          <Link to="/searchresturant">
            <p className="text-lg font-semibold text-gray-700">
              <IoIosSearch className="inline-flex mr-2" />
              Search
            </p>
          </Link>
          <p className="text-lg font-semibold text-gray-700">
            <BiSolidOffer className="inline-flex mr-2" />
            Offers
          </p>
          <p className="text-lg font-semibold text-gray-700">
            <IoMdHelpBuoy className="inline-flex mr-2" />
            Help
          </p>
          <p
            className="text-lg font-semibold text-gray-700"
            onClick={handleLoginClick}
          >
            <PiSignInBold className="inline-flex mr-2" />
            Sign In
          </p>
          <Link to={"cart"}>
            {" "}
            <p className="text-lg font-semibold text-gray-700">
              <BsCartPlusFill className="inline-flex mr-2" />
              Cart - {noOfItems}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
