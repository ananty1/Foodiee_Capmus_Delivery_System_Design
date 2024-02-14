import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RestaurantCard({
  shopID,
  title,
  rating,
  deliveryTime,
  cuisine,
  location,
  imageSrc,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/foodiee-home/items/${shopID}`);
  };
  return (
    <>
      <div
        className="cursor-pointer max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg mt-10 md:w-1/3 px-4 transition-transform transform hover:scale-105"
        onClick={handleClick}
      >
        <img
          className="w-full h-48 object-cover"
          src={imageSrc}
          alt="Restaurant"
        />

        <div className="px-6 py-4">
          <div className="mb-2">
            <span className="font-bold text-xl">{title}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-700 font-bold">Rating:</span>
            <span className="ml-2 text-gray-700 font-bold">{rating} ⭐</span>
            <span className="ml-2 text-gray-500 font-bold">•</span>
            <span className="ml-2 text-gray-700 font-bold">Delivery Time:</span>
            <span className="ml-2 text-gray-700">{deliveryTime} mins</span>
          </div>

          <div className="mb-2">
            <span className="text-gray-600">{cuisine}</span>
          </div>

          <div>
            <span className="text-gray-600">{location}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function RestaurantList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [restaurantsData, setrestaurantsData] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fectReatraunetData = async () => {
      const restaurants = await axios.get(
        "http://localhost:5000/shopkeeper/get-restaurants"
      );
      let updateRes = restaurants.data.map((shop, index) => {
        let obj = {
          shopID: shop.ShopkeeperID,
          title: shop.ShopName,
          rating: "4.5",
          deliveryTime: "30",
          cuisine: "Italian, Asian, Mexican, American, Salads, Continental..",
          location: `${shop.City}, ${shop.State}`,
          imageSrc: "/1.jpg",
        };
        return obj;
      });
      setrestaurantsData(updateRes);
    };
    fectReatraunetData();
  }, []);

  const handleSearch = async () => {
    // Simulate fetching data from a backend
    const restaurants = await axios.get(
      "http://localhost:5000/shopkeeper/get-restaurants"
    );
    let updateRes = restaurants.data.map((shop, index) => {
      let obj = {
        shopID: shop.ShopkeeperID,
        title: shop.ShopName,
        rating: "4.5",
        deliveryTime: "30",
        cuisine: "Italian, Asian, Mexican, American, Salads, Continental..",
        location: `${shop.City}, ${shop.State}`,
        imageSrc: "/1.jpg",
      };
      return obj;
    });
    setrestaurantsData(updateRes);

    const filtered = updateRes.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setrestaurantsData(filtered);
  };

  return (
    <>
      <div class="flex items-center justify-center">
        <label for="voice-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full md:w-1/2 lg:w-1/3">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos, Design Templates..."
            // required
            onChange={handleChange}
          />
          <button
            type="button"
            class="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
              />
            </svg>
          </button>
        </div>
        <button
          // type="submit"
          class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSearch}
        >
          <svg
            class="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          Search
        </button>
      </div>

      <p className="text-3xl font-bold mx-[30px]">Restaurants Near me</p>
      <div className="flex flex-wrap -mx-4 mb-40">
        {restaurantsData.map((restaurant, index) => (
          <RestaurantCard key={index} {...restaurant} />
        ))}
      </div>
    </>
  );
}

export default RestaurantList;
