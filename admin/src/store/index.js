import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import productNOrder from './slice/productNOrder'

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    ProductnOrder: productNOrder
  },
})