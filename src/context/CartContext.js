import React from 'react'

const CartContext = React.createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  activeTabId: '',
})

export default CartContext
