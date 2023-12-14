import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ItemHeading from '../ItemHeading'
import MenuItems from '../MenuItems'
import './index.css'

class Header extends Component {
  state = {
    restaurantName: '',
    menuList: [],
    activeTabId: 'Salads and Soup',
    count: 0,
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
      restaurantName: name,
      menuList: menuItems,
    })
  }

  updateActiveTabId = tabId => {
    this.setState({activeTabId: tabId})
  }

  render() {
    const {restaurantName, menuList, activeTabId, count} = this.state
    return (
      <>
        <div className="heading-container">
          <h1 className="heading">{restaurantName}</h1>
          <div className="orders-logo-container">
            <h1 className="my-order">My Orders</h1>
            <AiOutlineShoppingCart className="logo" />
            <p className="items-count">{count}</p>
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
    )
  }
}

export default Header
