var React = require('react')
var FilterOptions = require('./filter_options')
var BasketBox = require('./basket_box')

var OptionsBox = React.createClass({

  basketContainerClassName: "row basket-container-hide",

  handleBasketClick: function(){
    if(this.basketContainerClassName === "row"){
      this.basketContainerClassName = "row basket-container-hide"
    }else{
      this.basketContainerClassName = "row"
    }
    this.forceUpdate()
  },

  render: function(){
    return(
    <div className="row">
      <div className="row" id="options-box">
        <div className="col-1"></div>

        <div className="col-6">
          <h1>Clothing Retailer</h1>
        </div>


        <div className="col-4" id="basket-button-container">
          <button onClick={this.handleBasketClick} className="basket-button">{this.props.shoppingBasket.items.length}</button>
        </div>

        <div className="col-1"></div>
      </div>

      <hr/>

      <div className={this.basketContainerClassName} id="basket-container">
        <BasketBox removeItemFromBasket={this.props.removeItemFromBasket} shoppingBasket = {this.props.shoppingBasket} addVoucher={this.props.addVoucher} updateShoppingBasket={this.props.updateShoppingBasket} productManager={this.props.productManager} updateProductManager={this.props.updateProductManager} />
        <hr/>
      </div>

    </div>
      )}

  })

module.exports = OptionsBox;