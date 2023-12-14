import './index.css'
import {Component} from 'react'
import EachCategory from '../EachCategory'

class MenuItems extends Component {
  getData = (dataList, activeTabId) => {
    const filteredData = dataList.filter(
      eachObj => eachObj.menuCategory === activeTabId,
    )
    return filteredData
  }

  render() {
    const {dataList, activeTabId} = this.props
    const itemsData = this.getData(dataList, activeTabId)
    // console.log(itemsData)
    // console.log(activeTabId)

    return (
      <>
        <div>
          {itemsData.map(eachTypeLists => (
            <EachCategory
              key={eachTypeLists.menuCategoryId}
              menuCategoryLists={eachTypeLists}
            />
          ))}
        </div>
      </>
    )
  }
}

export default MenuItems
