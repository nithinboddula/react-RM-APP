import './index.css'
import ItemCard from '../ItemCard'

const EachCategory = props => {
  const {menuCategoryLists} = props
  //   console.log(menuCategoryLists)

  const eachCategoryItems = menuCategoryLists.categoryDishes.map(eachObj => ({
    dishId: eachObj.dish_id,
    dishName: eachObj.dish_name,
    dishPrice: eachObj.dish_price,
    dishImage: eachObj.dish_image,
    dishCurrency: eachObj.dish_currency,
    dishCalories: eachObj.dish_calories,
    dishDescription: eachObj.dish_description,
    dishAvailability: eachObj.dish_Availability,
    dishType: eachObj.dish_Type,
    nextUrl: eachObj.nexturl,
    addonCat: eachObj.addonCat,
  }))

  return eachCategoryItems.map(eachItem => (
    <ItemCard key={eachItem.dishId} dishDetails={eachItem} />
  ))
}

export default EachCategory
