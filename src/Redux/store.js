"use client";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/Redux/slices/ProductSlice";
import themeReducer from "@/Redux/slices/ThemeSlice";
import authReducer from "@/Redux/slices/authSlice";
import cartReducer from "@/Redux/slices/CartSlice";
import orderReducer from "@/Redux/slices/OrderSlice";
import userReducer from "@/Redux/slices/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    theme: themeReducer,
  },
});
