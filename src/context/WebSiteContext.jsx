import React, { createContext, useEffect, useState } from "react";

export const BlinkitContext = createContext();

export default function WebSiteContext({ children }) {

  const [cart, setCart] = useState ( JSON.parse(localStorage.getItem("BlinkiEcom")) ?? []);

  useEffect   (() => {
      localStorage.setItem("BlinkiEcom", JSON.stringify(cart))
  } ,[cart])

  const[price , setPrice] = useState(0)

  return (
    <BlinkitContext.Provider value={{ cart, setCart, price , setPrice }}>
      {children}
    </BlinkitContext.Provider>
  );
}