import { useState, createContext } from 'react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CartContext from '../components/CartContext';


export default function App({ Component, pageProps }) {
  //CartContext
  const [nameContext, setNameContext] = useState("");
  const [imageURLContext, setImageURLContext] = useState("");
  const [serviceDetailContext, setServiceDetailContext] = useState("");
  const [teamLinkContext, setTeamLinkContext] = useState("");
  const [languageContext, setLanguageContext] = useState("");
  const [priceContext, setPriceContext] = useState("");
  const [dateContext, setDateContext] = useState("");

  const [dateArrangeContext, setAateArrangeContext] = useState("No date");
  const [stateContext, setStateContext] = useState("Published");
  const [sellerIDContext, setSellerIDContext] = useState("No Seller");
  const [buyerIDContext, setBuyerIDContext] = useState("No Buyer");

  return (
    <CartContext.Provider value={{
      nameContext, imageURLContext, serviceDetailContext, teamLinkContext, languageContext,
      priceContext, dateContext, dateArrangeContext, stateContext, sellerIDContext, buyerIDContext,
      setNameContext, setImageURLContext, setServiceDetailContext, setTeamLinkContext, setLanguageContext,
      setPriceContext, setDateContext, setAateArrangeContext, setStateContext, setSellerIDContext, setBuyerIDContext
    }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  )

}
