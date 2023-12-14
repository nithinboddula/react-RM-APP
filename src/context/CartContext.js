import React from 'react'

const CartContext = React.createContext({
  updateCartCount: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
