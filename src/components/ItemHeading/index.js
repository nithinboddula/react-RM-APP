import './index.css'

const ItemHeading = props => {
  const {itemDetails, updateActiveTabId, isActive} = props

  const {menuCategory} = itemDetails

  const onClickTabItem = () => {
    updateActiveTabId(menuCategory)
  }

  const activeTabClassName = isActive ? 'active' : ''

  return (
    <button
      type="button"
      onClick={onClickTabItem}
      className={`tab-button ${activeTabClassName}`}
    >
      <label className="tab-name">{menuCategory}</label>
    </button>
  )
}

export default ItemHeading
