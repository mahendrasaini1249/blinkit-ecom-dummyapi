
import React, { useEffect, useState, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BlinkitContext } from "../context/WebSiteContext";

export default function Header() {

  const { cart } = useContext(BlinkitContext)

  const items = ["milk", "bread", "sugar", "perfume", "eggs"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  return (
    <header className="w-full sticky top-0 right-0 bg-white shadow-lg z-50">

      <div className="flex flex-wrap items-center justify-between px-3 md:px-6 py-3 gap-3">

        {/* Logo */}
        <div className="text-[28px] md:text-[40px] font-bold text-[#54B226]">
          <Link to={"/"}>
            <span className="text-yellow-400"> blink</span>it
          </Link>
        </div>

        {/* Delivery Info */}
        <div className="hidden md:flex flex-col leading-tight">
          <span className="font-bold text-black">
            Delivery in 14 minutes
          </span>
          <span className="text-sm text-gray-600">
            Shastri Nagar, Lankapuri, Ram Nagar ▼
          </span>
        </div>

        {/* Search Bar */}
        <div className="order-3 w-full md:order-none md:w-[40%] flex items-center bg-gray-100 px-4 py-2 rounded-lg">
          <IoSearch className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder={`Search "${items[index]}"`}
            className="bg-transparent outline-none px-2 w-full text-sm"
          />
        </div>

        {/* Login */}
        <div className="hidden sm:block text-gray-700 font-medium cursor-pointer">
          Login
        </div>

        {/* Cart */}
        <Link to={"/cart"}>
          <div className="flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-lg cursor-pointer">

            <FaShoppingCart className="text-xl" />

            <span className="text-base md:text-lg font-semibold">
              {cart.length === 0 ? "Cart" : `${cart.length} Items`}
            </span>

          </div>
        </Link>


      </div>
    </header>
  );
}