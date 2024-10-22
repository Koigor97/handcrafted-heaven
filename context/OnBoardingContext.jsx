"use client";

import { createContext, useReducer } from "react";

// Initial state
const initialState = {
  userInfo: {
    name: "",
    email: "",
    password: "",
    oauth_provider: "",
    oauth_id: "",
    role: "artisan",
    phone: "",
    user_image_url: "",
  },
  artisanInfo: {
    user_id: null,
    bio: "",
    shop_name: "",
    shop_description: "",
    shop_logo_url: "",
    rating: 0,
    total_sales: 0,
  },
  currentStep: 1,
};

// Reducer function
function onboardingReducer(state, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
      };
    case "SET_ARTISAN_INFO":
      return {
        ...state,
        artisanInfo: {
          ...state.artisanInfo,
          ...action.payload,
        },
      };
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    default:
      return state;
  }
}

// Context
const OnboardingContext = createContext();

// Context Provider component
export function OnboardingProvider({ children }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
}

// custom useContext hook
export function useOnboardingContext() {
  // check if context exists
  if (!OnboardingContext) {
    throw new Error(
      "useOnboardingContext must be used within a OnboardingProvider"
    );
  }

  return useContext(OnboardingContext);
}