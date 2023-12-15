import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import ItemHeading from '../ItemHeading'
import MenuItems from '../MenuItems'
import CartContext from '../../context/CartContext'

import './index.css'

class Home extends Component {
  state = {
    menuList: [],
    activeTabId: 'Salads and Soup',
    cartItems: [],
    isLoading: true,
    restaurantName: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const name = data[0].restaurant_name
    const menuItems = data[0].table_menu_list.map(eachObj => ({
      menuCategory: eachObj.menu_category,
      menuCategoryId: eachObj.menu_category_id,
      categoryDishes: eachObj.category_dishes,
    }))

    this.setState({
      menuList: menuItems,
      isLoading: false,
      restaurantName: name,
    })
  }

  updateActiveTabId = tabId => {
    this.setState({activeTabId: tabId})
  }

  addItemToCart = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}

      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, newDish],
      }))
    } else {
      this.setState(prev => {
        const items = prev.cartItems.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        )
        return {cartItems: items}
      })
    }
  }

  removeItemFromCart = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadyExists) {
      this.setState(prev => {
        const items = prev.cartItems.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )

        const filterItems = items.filter(item => item.quantity >= 0)
        return {cartItems: filterItems}
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="orange" height="50" width="50" />
    </div>
  )

  render() {
    const {
      menuList,
      activeTabId,
      cartItems,
      isLoading,
      restaurantName,
    } = this.state
    const getCartItemsCount = () =>
      cartItems.reduce((acc, item) => acc + item.quantity, 0)
    return isLoading ? (
      this.renderLoadingView()
    ) : (
      <CartContext.Provider
        value={{
          menuList,
          addItemToCart: this.addItemToCart,
          removeItemFromCart: this.removeItemFromCart,
          activeTabId,
          cartItems,
        }}
      >
        <>
          <div className="heading-container">
            <h1 className="heading">{restaurantName}</h1>
            <div className="orders-logo-container">
              <h1 className="my-order">My Orders</h1>
              <AiOutlineShoppingCart className="logo" />
              <p className="items-count">{getCartItemsCount()}</p>
            </div>
          </div>
          <hr className="hr" />
          <div className="labels-container">
            {menuList.map(tabDetails => (
              <ItemHeading
                key={tabDetails.menuCategoryId}
                itemDetails={tabDetails}
                updateActiveTabId={this.updateActiveTabId}
                isActive={tabDetails.menuCategory === activeTabId}
              />
            ))}
          </div>
          <hr className="hr" />

          <MenuItems dataList={menuList} activeTabId={activeTabId} />
        </>
      </CartContext.Provider>
    )
  }
}

export default Home
