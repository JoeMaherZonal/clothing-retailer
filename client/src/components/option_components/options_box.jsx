var React = require('react')
var FilterOptions = require('./filter_options')
var BasketBox = require('./basket_box')

var OptionsBox = React.createClass({

  filterOptionsClassName: "row filter-options-hide",
  basketContainerClassName: "row basket-container-hide",

  handleFilterClick: function(){
    console.log("filter clicked")
    this.basketContainerClassName = "row basket-container-hide"
    if(this.filterOptionsClassName === "row"){
      this.filterOptionsClassName = "row filter-options-hide"
    }else{
      this.filterOptionsClassName = "row"
    }
    this.forceUpdate()
  },

  handleBasketClick: function(){
    console.log("basket clicked")
    this.filterOptionsClassName = "row filter-options-hide"
    if(this.basketContainerClassName === "row"){
      this.basketContainerClassName = "row basket-container-hide"
    }else{
      this.basketContainerClassName = "row"
    }
    this.forceUpdate()
  },

  render: function(){
    return(
      <div className="col-12" id="options-box">
        <div className="row">

          <div className="col-1"></div>
          <div className="col-5" id="filter-button-container">
            <button onClick={this.handleFilterClick} className="filter-button">Filter</button>
          </div>
          <div className="col-5" id="basket-button-container">
            <button onClick={this.handleBasketClick} className="basket-button">{this.props.shoppingBasket.items.length}</button>
          </div>
          <div className="col-1"></div>

          <div className={this.filterOptionsClassName} id="filter-options">
            <FilterOptions updateFilter={this.props.updateFilter} />
          </div>

          <div className={this.basketContainerClassName} id="basket-container">
            <BasketBox removeItemFromBasket={this.props.removeItemFromBasket} shoppingBasket = {this.props.shoppingBasket} addVoucher={this.props.addVoucher} updateShoppingBasket={this.props.updateShoppingBasket} />
          </div>

        </div>
      </div>
      )}

  })

module.exports = OptionsBox;