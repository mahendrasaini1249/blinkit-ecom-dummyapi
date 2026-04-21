import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { BlinkitContext } from "./context/WebSiteContext";
import { ToastContainer, toast } from 'react-toastify';

export default function Checkout() {


  const { cart, setCart } = useContext(BlinkitContext)


  let [singleProduct, SetSingalProduct] = useState({})

  let ProductId = useParams().id
  // change src//
  let [mainimg, SetMainImg] = useState("");

  let productdata = () => {
    axios.get(`https://dummyjson.com/products/${ProductId}`)
      .then((ress) => {
        SetSingalProduct(ress.data);
        SetMainImg(ress.data.images?.[0] || ress.data.thumbnail);
      })
      .catch((errr) => {
        console.log(errr)
      })
  }

  useEffect(() => {
    productdata();
  }, [ProductId]);

  // add to cart //

  let isAlreadyCart;

  let addtocart = (sProduct) => {
    let obj = {
      id: sProduct.id,
      img: sProduct.thumbnail,
      price: sProduct.price,
      title: sProduct.title,
      brand: sProduct.brand,
      quantity: 1
    }

     isAlreadyCart = cart.some((item, index) => {
      if (item.id == obj.id) {
        return (
          item
        )
      }
    })
    if (isAlreadyCart == true) {
      toast.error("This items is alread added ❌")
    }
    else {
      setCart([...cart, obj])
      toast.success(" items add successful 👍!");
    }

  }

  return (
    <>
      <ToastContainer />
      <div className="w-full bg-white">

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4">

          {/* LEFT IMAGE */}
          <div>

            {/* Main Image */}
            <div className="border rounded-xl p-4 transition-all duration-300 ease-in-out hover:bg-white hover:shadow-lg hover:scale-[1.05]">
              <img
                src={mainimg || singleProduct.thumbnail}
                className="w-full h-[300px] object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">

              {singleProduct?.images?.map((img, i) => (
                <div
                  key={i}
                  onClick={() => SetMainImg(img)}
                  className={` border rounded-lg p-2 min-w-[70px] cursor-pointer  transition-all duration-300 ease-in-out hover:bg-white hover:shadow-lg hover:scale-[1.1]
                      ${mainimg === img ? "border-green-600" : ""}`}>
                  <img src={img} className="h-[60px] object-contain" />
                </div>
              ))}

            </div>

          </div>

          {/* RIGHT DETAILS */}
          <div className="flex flex-col gap-4">
            <p className=" font-semibold text-green-600">
              {singleProduct.shippingInformation}
            </p>

            {/* Breadcrumb */}
            <p className="text-sm text-gray-500">
              {singleProduct.description}
            </p>

            {/* Title */}
            <h1 className="text-2xl font-bold">
              {singleProduct.title}
            </h1>

            {/* Select Unit */}
            <div>
              <p className="font-medium mb-2"> {singleProduct.category}</p>

              <div className="gap-3">

                <div className=" rounded-xl">
                  <p className="font-semibold text-red-600">  ₹ {((singleProduct.price) + 50).toFixed(2)} </p>

                </div>

                <div className="rounded-xl mt-2">
                  <p className="text-sm text-gray-600">
                    ⭐ {singleProduct?.rating}
                  </p>
                  <p className="font-semibold mt-2 text-green-600"> Stock: {singleProduct.stock}</p>

                </div>

              </div>
            </div>

            {/* Price */}


            {/* Button */}
            <button onClick={() => { addtocart(singleProduct) }} className="bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
              Add to cart
            </button>

          </div>

        </div>

      </div>
    </>
  );
}