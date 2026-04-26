import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);

  if (products.length === 0) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="w-full mt-2 overflow-hidden">
      {/* Top Banner */}
      <div className="w-full max-w-[1300px] mx-auto px-2 sm:px-4">
        <img
          src="img/Frame-1437256605-2-2.jpg"
          className="w-full rounded-xl"
          alt=""
        />
      </div>

      {/* Top Images */}
      <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 px-2 sm:px-4">
        <img
          src="/img/pharmacy-WEB.jpg"
          className="rounded-xl w-full"
          alt=""
        />
        <img
          src="/img/pet_crystal_WEB-1.png"
          className="rounded-xl w-full"
          alt=""
        />
        <img
          src="/img/baby_crystal_WEB-1.png"
          className="rounded-xl w-full"
          alt=""
        />
      </div>

      {/* Mini Categories */}
      <div className="w-full mt-3">
        <Link to="/category">
          <MininImg products={products} />
        </Link>
      </div>

      {/* Sliders */}
      <div className="w-full max-w-[1300px] mx-auto px-2 sm:px-4">
        {categories.map((cat, index) => {
          let filtered = products.filter((p) => p.category === cat);

          if (filtered.length === 0) return null;

          if (filtered.length < 6) {
            const repeat = [...filtered];
            while (filtered.length < 6) {
              filtered = [...filtered, ...repeat];
            }
          }

          return (
            <SlickSlider
              key={index}
              title={cat}
              products={filtered}
            />
          );
        })}
      </div>
    </div>
  );
}

// Mini Category
const MininImg = ({ products }) => {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="w-full px-[10px] mt-4">
      <h1 className="font-semibold mb-2">Category</h1>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
        {categories.map((cat, i) => {
          const product = products.find((p) => p.category === cat);

          return (
            <div
              key={i}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="bg-[#f2f3f5] rounded-xl p-3 w-full flex items-center justify-center">
                <img
                  src={product?.thumbnail}
                  className="h-[55px] sm:h-[60px] object-contain"
                  alt=""
                />
              </div>

              <p className="text-[11px] sm:text-xs text-center mt-2 capitalize leading-tight">
                {cat}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Slider
const SlickSlider = ({ title, products }) => {
  const [slides, setSlides] = useState(6);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;

      if (width <= 640) setSlides(1);
      else if (width <= 768) setSlides(3);
      else if (width <= 1024) setSlides(4);
      else if (width <= 1280) setSlides(5);
      else setSlides(6);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);

    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const settings = {
    dots: false,
    infinite: products.length > slides,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: 1,

    swipe: true,
    swipeToSlide: true,
    draggable: true,
    touchMove: true,

    waitForAnimate: false,
    touchThreshold: 8,
    adaptiveHeight: false,

    arrows: slides > 1,
  };

  return (
    <div className="w-full mt-5 overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold capitalize">
          {title}
        </h2>

        <span className="text-green-600 text-xs sm:text-sm cursor-pointer">
          see all
        </span>
      </div>

      <Slider {...settings} className="mobile-slider">
        {products.map((item, i) => (
          <div key={i} className="px-2 box-border">
            <ProductCard item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Product Card
const ProductCard = ({ item }) => {
  return (
    <div
      style={{ touchAction: "pan-y" }}
      className="max-w-full bg-white rounded-xl border shadow-sm hover:shadow-md transition p-3 min-h-[260px] sm:min-h-[280px] flex flex-col"
    >
      <img
        src={item.thumbnail}
        className="w-full h-[130px] sm:h-[110px] md:h-[140px] object-contain"
        alt=""
      />

      <p className="text-[11px] bg-gray-100 inline-block px-2 py-1 rounded mt-2 w-fit">
        ⏱ 11 MINS
      </p>

      <h3 className="text-sm font-medium mt-2 line-clamp-2 min-h-[42px]">
        {item.title}
      </h3>

      <p className="text-xs text-gray-500 truncate mt-1">
        {item.brand}
      </p>

      <div className="flex justify-between items-center mt-auto pt-3">
        <span className="font-semibold text-base sm:text-sm">
          ₹{item.price}
        </span>

        <button className="border border-green-600 text-green-600 px-4 py-1 rounded-md text-xs font-medium hover:bg-green-600 hover:text-white">
          ADD
        </button>
      </div>
    </div>
  );
};