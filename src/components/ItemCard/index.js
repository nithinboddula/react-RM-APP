import './index.css'
import CartContext from '../../context/CartContext'

const ItemCard = props => (
  <CartContext.Consumer>
    {value => {
      const {addItemToCart, removeItemFromCart, cartItems} = value
      const {dishDetails} = props
      const {
        dishName,
        dishPrice,
        dishCalories,
        dishCurrency,
        dishImage,
        dishDescription,
        dishType,
        dishAvailability,
        addonCat,
        dishId,
      } = dishDetails

      const onIncreaseQuantity = () => addItemToCart(dishDetails)
      const onDecreaseQuantity = () => removeItemFromCart(dishDetails)

      const getQuantity = () => {
        const cartItem = cartItems.find(item => item.dishId === dishId)
        return cartItem ? cartItem.quantity : 0
      }

      return (
        <div className="item-container">
          <div className="first-part-container">
            {dishType === 2 ? (
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/vegetarian-food-symbol.png"
                alt="vegetarian-food-symbol"
              />
            ) : (
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png"
                alt="non-vegetarian-food-symbol"
              />
            )}
            <div className="text-container">
              <h1 className="item-name">{dishName}</h1>
              <p className="item-price">
                {dishCurrency} {dishPrice}
              </p>
              <p className="item-description">{dishDescription}</p>
              {dishAvailability ? (
                <div className="button-style">
                  <button
                    type="button"
                    className="button"
                    onClick={onDecreaseQuantity}
                  >
                    -
                  </button>
                  <p className="count">{getQuantity()}</p>
                  <button
                    type="button"
                    className="button"
                    onClick={onIncreaseQuantity}
                  >
                    +
                  </button>
                </div>
              ) : (
                <p className="not-available">Not Available</p>
              )}

              {addonCat.length > 0 ? (
                <p className="customization">Customizations available</p>
              ) : null}
            </div>
          </div>
          <p className="calories">{dishCalories} calories</p>
          <img src={dishImage} className="item-image" alt="logo" />
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default ItemCard
