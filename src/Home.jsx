import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

export default function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=200")
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.log(err));
  }, []);

  if (products.length === 0) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className='w-full mt-2'>

      {/* Top Banner */}
      <div className='w-full max-w-[1300px] mx-auto px-2 sm:px-4'>
        <img src="img/Frame-1437256605-2-2.jpg" className="w-full rounded-xl" />
      </div>

      {/* Top 3 Images */}
      <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 px-2 sm:px-4">
        <img src="/img/pharmacy-WEB.jpg" className="rounded-xl w-full" />
        <img src="/img/pet_crystal_WEB-1.png" className="rounded-xl w-full" />
        <img src="/img/baby_crystal_WEB-1.png" className="rounded-xl w-full" />
      </div>

      {/* Mini Categories (UNCHANGED) */}
      <div className='w-full mt-3'>
         
        <Link to="/category">
          <MininImg products={products} />
        </Link>
      </div>

      {/* Sliders */}
      <div className='w-full max-w-[1300px] mx-auto px-2 sm:px-4'>
      
        {categories.map((cat, index) => {

          let filtered = products.filter(p => p.category === cat);

          if (filtered.length === 0) return null;

          // repeat fix
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


// 🔽 Mini Categories


let MininImg = ({ products }) => {

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="w-full px-[10px] mt-4">
        <h1 className='font-semibold mb-2'>Category</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
        
        {categories.map((cat, i) => {
          const product = products.find(p => p.category === cat);

          return (
            <div key={i} className="flex flex-col items-center cursor-pointer">

              <div className="bg-[#f2f3f5] rounded-xl p-3 w-full flex items-center justify-center">
                <img 
                  src={product?.thumbnail} 
                  className="h-[60px] object-contain" 
                  alt="" 
                />
              </div>

              <p className="text-xs text-center mt-2 capitalize leading-tight">
                {cat}
              </p>

            </div>
          );
        })}

      </div>
    </div>
  );
};

////////////////////////////////////////////////////
// 🔽 FIXED SLIDER
////////////////////////////////////////////////////

let SlickSlider = ({ title, products }) => {

  const settings = {
    dots: false,
    infinite: products.length > 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2.5 } },
      { breakpoint: 480, settings: { slidesToShow: 2.2 } }
    ]
  };

  return (
    <div className="w-full mt-4">

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base sm:text-lg font-semibold capitalize">
          {title}
        </h2>
        <span className="text-green-600 text-xs sm:text-sm cursor-pointer">
          see all
        </span>
      </div>

      <Slider {...settings}>
        {products.map((item, i) => (
          <div key={i} className="px-1">
            <ProductCard item={item} />
          </div>
        ))}
      </Slider>

    </div>
  );
};

////////////////////////////////////////////////////
// 🔽 Product Card
////////////////////////////////////////////////////

let ProductCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl p-2 sm:p-3 shadow-sm border hover:shadow-md transition h-full">

      <img
        src={item.thumbnail}
        className="w-full h-[120px] sm:h-[140px] md:h-[160px] object-contain"
        alt=""
      />

      <p className="text-[10px] bg-gray-100 inline-block px-2 py-[2px] rounded mt-2">
        ⏱ 11 MINS
      </p>

      <h3 className="text-xs sm:text-sm font-medium mt-1 line-clamp-2">
        {item.title}
      </h3>

      <p className="text-[10px] sm:text-xs text-gray-500">
        {item.brand}
      </p>

      <div className="flex justify-between items-center mt-2">
        <span className="font-semibold text-xs sm:text-sm">
          ₹{item.price}
        </span>

        <button className="border border-green-600 text-green-600 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-green-600 hover:text-white">
          ADD
        </button>
      </div>

    </div>
  );
};