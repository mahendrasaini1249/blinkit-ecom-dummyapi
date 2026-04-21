import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Category() {

  let [productdata, SetProductData] = useState([])
  let [changeurl, SetChangeUrl] = useState("")

  let dispalyData = () => {
    let Api;
    if (changeurl == "") {
      Api = "https://dummyjson.com/products?limit=200"
    }
    else {
      Api = changeurl
    }
    axios.get(Api)
      .then((ress) => {
        SetProductData(ress.data.products)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  let [catdata, SetCatData] = useState([])

  let showCat = () => {
    axios.get("https://dummyjson.com/products/categories")
      .then((ress) => {
        SetCatData(ress.data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    dispalyData()
  }, [changeurl])

  useEffect(() => {
    showCat()
  }, [])

  let getUrl = useCallback((cat) => {
    SetChangeUrl(cat)
  })

  return (
    <div className='w-full mt-2 px-2'>
      
      {/* Heading */}
      <div className='max-w-[1200px] mx-auto border border-gray-300 p-2 font-semibold text-sm md:text-base'>
        Buy Poducts Online
      </div>

      <div className='max-w-[1200px] mx-auto shadow flex flex-col md:flex-row gap-2 border border-gray-400'>

        {/* CATEGORY */}
        <div className='w-full md:w-[180px] bg-gray-100 md:h-[80vh] overflow-x-auto md:overflow-y-auto'>
          <ul className="flex md:block text-sm font-medium">
            {
              catdata.length > 0
                ?
                catdata.map((v, i) => (
                  <Categoryitem item={v} key={i} getUrl={getUrl} />
                ))
                :
                ""
            }
          </ul>
        </div>

        {/* PRODUCTS */}
        <div className='flex-1 md:h-[80vh] overflow-y-auto p-2 mt-2'>
          
          <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
            {
              productdata.length > 0
                ?
                productdata.map((value, index) => (
                  <Card item={value} key={index} />
                ))
                :
                <div className="col-span-full flex items-center justify-center h-[300px]">
                  <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
          </div>

        </div>

      </div>
    </div>
  )
}


// CARD
let Card = ({ item }) => {
  return (
    <div className='bg-white p-2 md:p-3 rounded-xl shadow transition-all duration-300 hover:shadow-lg hover:scale-[1.05]'>

      <div className='flex justify-between text-[10px] md:text-xs'>
        <span className='text-green-500'>{item.availabilityStatus}</span>
        <span className='text-red-500'>* {item.rating}</span>
      </div>

      <div className='w-fit mt-1 text-[10px] md:text-xs rounded-sm bg-green-500 px-1'>
        {item.discountPercentage} %OFF
      </div>

      <Link to={`checkout/${item.id}`}>
        <img
          className='w-full h-[70px] md:h-[80px] object-contain'
          src={item.thumbnail}
          alt="milk"
        />
      </Link>

      <p className='text-[10px] md:text-xs text-gray-500 mt-1'>
        ⏱ {item.shippingInformation}
      </p>

      <h3 className='text-xs md:text-sm font-medium line-clamp-2'>
        {item.category}
      </h3>

      <p className='text-[10px] md:text-xs text-gray-500'>
        {item.title}
      </p>

      <div className='flex justify-between items-center mt-1'>
        <span className='text-xs md:text-sm font-semibold'>
          ₹ {((item.price) + 20).toFixed(2)}
        </span>

        <Link to={`checkout/${item.id}`}>
          <button className='border border-green-600 text-green-600 px-2 py-1 rounded-md text-[10px] md:text-sm hover:bg-green-600 hover:text-white transition'>
            ADD
          </button>
        </Link>
      </div>
    </div>
  )
}


// CATEGORY ITEM
let Categoryitem = ({ item, getUrl }) => {
  return (
    <li
      onClick={() => getUrl(item.url)}
      className='px-3 py-2 text-xs md:text-sm cursor-pointer rounded-xl 
      transition-all duration-300 hover:bg-white hover:shadow whitespace-nowrap md:whitespace-normal'
    >
      {item.name}
    </li>
  )
}