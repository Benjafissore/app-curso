import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingProduct = state.find(item => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload)
    },
    decreaseQuantity: (state, action) => {
      const product = state.find(item => item.id === action.payload)
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1
        } else {
          return state.filter(item => item.id !== action.payload)
        }
      }
    },
  },
})

export const { addToCart, removeFromCart, decreaseQuantity } = cartSlice.actions

export const selectCartTotal = (state) =>
  state.cart.reduce((total, item) => total + item.price * item.quantity, 0)

export default cartSlice.reducer
