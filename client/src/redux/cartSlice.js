import { createSlice } from '@reduxjs/toolkit'

const cart = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: false,
    cartItems: cart,
  },
  reducers: {
    addProduct: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload]
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
    },
    deleteteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      )
    },
    deleteteAllCart: (state) => {
      state.cartItems = []
    },
    showLoading: (state) => {
      state.loading = true
    },
    hideLoading: (state) => {
      state.loading = false
    },
  },
})

export const {
  addProduct,
  updateCart,
  deleteteFromCart,
  showLoading,
  hideLoading,
  deleteteAllCart,
} = cartSlice.actions
export default cartSlice.reducer
