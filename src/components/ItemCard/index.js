import './index.css'

const ItemCard = props => {
  const {data} = props
  //   console.log(data)
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
  } = data

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
            <span className="button-style">
              <button type="button" className="button">
                -
              </button>
              <span className="count">0</span>
              <button type="button" className="button">
                +
              </button>
            </span>
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
}

export default ItemCard
