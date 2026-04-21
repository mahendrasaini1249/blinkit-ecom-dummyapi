"use client";
import React, { useContext, useEffect, useState } from "react";
import { BlinkitContext } from "./context/WebSiteContext";


export default function ViewCart() {

  const { cart, setCart, price, setPrice } = useContext(BlinkitContext)


  useEffect(() => {
    let sum = 0;
    cart.forEach((element) => {
      sum += element.quantity * element.price;
    });
    setPrice(sum);
  }, [cart]);

  return (
    <div className="w-full min-h-screen bg-gray-100 py-6">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          🛒 Your Cart
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Cart Items */}


          <div className="flex-1 space-y-4">

            {/* Item 1 */}

            {
              cart.length == 0
                ? "NO items added in cart"
                : cart.length > 0
                  ?
                  cart.map((item, index) =>

                  (
                    <CartItem item={item} key={index} />
                  ))
                  : "Please wait........"
            }
            {/* Item 2 */}


          </div>

          {/* Summary */}
          <div className="w-full lg:w-[350px] bg-white p-6 rounded-xl shadow h-fit">
            <h3 className="text-xl font-semibold mb-4">
              Order Summary
            </h3>

            <div className="flex justify-between mb-2">
              <span className="font-bold">Price</span>
              <span>{(price).toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="font-bold">GST</span>
              <span>18 % </span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span className="font-bold">Total Amount</span>
              <span>{(((price)*18/100) + (price)).toFixed(2)}</span>
            </div>

            <button className="w-full mt-6 bg-green-500  cursor-pointer hover:bg-green-600 text-white py-3 rounded-lg">
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

let CartItem = ({ item }) => {
  const { cart, setCart } = useContext(BlinkitContext);
  let [counter, SetCounter] = useState(item.quantity || 1);

  useEffect(() => {
    const newData = cart.map((value) => {
      if (value.id === item.id) {
        return { ...value, quantity: counter };
      }
      return value;
    });
    setCart(newData);
  }, [counter]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="grid grid-cols-5 items-center p-3 border-t bg-white">

      {/* Product */}
      <div className="flex items-center gap-2">
        <img src={item.img} className="w-12 h-12 rounded" />
        <span className="truncate">{item.title}</span>
      </div>

      {/* Price */}
      <div>₹{item.price}</div>

      {/* Qty */}
      <div>
        <div className="bg-green-600 flex items-center gap-2  text-white font-bold px-2 py-1 rounded w-fit">

          <span className="cursor-pointer" onClick={() => SetCounter(counter > 1 ? counter - 1 : 1)}>
            -
          </span>

          <span className="min-w-[20px] text-center">
            {counter}
          </span>

          <span className="cursor-pointer" onClick={() => SetCounter(counter < 15 ? counter + 1 : 15)}>
            +
          </span>

        </div>
      </div>

      {/* Total */}
      <div className="font-semibold">
        ₹{(item.price * counter).toFixed(2)}
      </div>

      {/* Remove */}
      <div>
        <button 
          onClick={() => removeItem(item.id)}
          className="px-3 py-1 bg-red-500 cursor-pointer text-white rounded"
        >
          Remove
        </button>
      </div>

    </div>
  );
};