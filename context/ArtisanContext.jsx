"use client";

import { createContext, useContext, useReducer } from "react";

const initialState = {
  artisanDetails: {},
  products: [],
  orders: [],
  metrics: {},
  salesData: null,
};

const artisanReducer = (state, action) => {
  switch (action.type) {
    case "SET_ARTISAN_DETAILS":
      return { ...state, artisanDetails: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET ORDERS":
      return { ...state, orders: action.payload };
    case "SET METRICS":
      return { ...state, metrics: action.payload };
    case "SET SALES_DATA":
      return { ...state, salesData: action.payload };
    default:
      return state;
  }
};

const ArtisanContext = createContext();

const ArtisanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(artisanReducer, initialState);

  return (
    <ArtisanContext.Provider value={{ state, dispatch }}>
      {children}
    </ArtisanContext.Provider>
  );
};

const useArtisan = () => {
  const context = useContext(ArtisanContext);

  if (!context) {
    throw new Error("useArtisan must be used within an ArtisanProvider");
  }
};

export { ArtisanProvider, useArtisan }; // Export the provider and the hook
