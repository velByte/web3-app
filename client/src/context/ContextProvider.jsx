import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  language: "en",
  theme: "light",
  user: null,
  token: null,
  cart: [],
  wishlist: [],
  orders: [],
  addresses: [],
  paymentMethods: [],
  notifications: [],
  search: "",
  isSidebarOpen: false,
  isCartOpen: false,
  isWishlistOpen: false,
  isSearchOpen: false,
  isLoginOpen: false,
  isSignupOpen: false,
  isForgotPasswordOpen: false,
  isResetPasswordOpen: false,
  isChangePasswordOpen: false,
  isChangeEmailOpen: false,
  isChangePhoneOpen: false,
  isChangeAddressOpen: false,
  isChangePaymentMethodOpen: false,
  isChangeNotificationOpen: false,
  isChangeLanguageOpen: false,
  isChangeThemeOpen: false,
  // isChangeCurrencyOpen : false,
  // isChangeCountryOpen : false,
  // isChangeTimeZoneOpen : false,
  // isChangeDateFormatOpen : false,
  // isChangeTimeFormatOpen : false,
  // isChangeWeightFormatOpen : false,
  // isChangeTemperatureFormatOpen : false,
  // isChangeDistanceFormatOpen : false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [activeTheme, setActiveTheme] = useState("light");

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        activeLanguage,
        setActiveLanguage,
        activeTheme,
        setActiveTheme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
