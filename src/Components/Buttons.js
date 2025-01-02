import React from "react";

const Buttons = () => {
  const cities = [
    "Best Restaurants in Bangalore",
    "Best Restaurants in Hyderabad",
    "Best Restaurants in Ahmedabad",
    "Best Restaurants in Pune",
    "Best Restaurants in Kolkata",
    "Best Restaurants in Mumbai",
    "Best Restaurants in Delhi",
    "Best Restaurants in Chennai",
    "Best Restaurants in Chandigarh",
    "Best Restaurants in Jaipur",
    "Best Restaurants in Nagpur",
  ];

  const cuisines = [
    "Chinese Restaurant Near Me",
    "South Indian Restaurant Near Me",
    "Indian Restaurant Near Me",
    "Korean Restaurant Near Me",
    "North Indian Restaurant Near Me",
    "Kerala Restaurant Near Me",
    "Punjabi Restaurant Near Me",
    "Seafood Restaurant Near Me",
    "Italian Restaurant Near Me",
    "Andhra Restaurant Near Me",
    "Bengali Restaurant Near Me",
  ];

  return (
    <div className="container w-3/4 mx-auto p-4">
      {/* Best Places to Eat Across Cities */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Best Places to Eat Across Cities
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city, index) => (
            <button
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
            >
              {city}
            </button>
          ))}
          {/* Show more button */}
          <button className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
            Show More
          </button>
        </div>
      </section>

      {/* Best Cuisines Near Me */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Best Cuisines Near Me</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cuisines.map((cuisine, index) => (
            <button
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
            >
              {cuisine}
            </button>
          ))}
          {/* Show more button */}
          <button className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
            Show More
          </button>
        </div>
      </section>

      <hr />
    </div>
  );
};

export default Buttons;
