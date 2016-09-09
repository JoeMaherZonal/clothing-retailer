var React = require('react')
var ProductList = require('./product_list')

var ProductBox = React.createClass({

  discount: "",

  getInitialState: function(){
    return {discount: 0}
  },

  handleClick: function(){
    this.props.addItemToBasket(this.props.product)
  },

  checkStockLevel: function(){
    return this.props.product.quantity === 0
  },

  render: function(){
    var originalPrice = null
    if(this.props.product.discount > 0){
      originalPrice = "£" + this.props.product.price
    }
    return(
        <div className="row" id='product-box'>
          <div className="col-12">

          <div className="row">
            <div className="col-12">
              <img id="product-image" src="images/shirticon.png"/>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <p id="product-box-name">{this.props.product.name}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <p id="product-box-cat">{this.props.product.categorys}</p>
              <p id="product-box-colour">{this.props.product.colour}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <p id="product-box-quantity">{this.props.product.quantity} available</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12" id="price-display">
            <p id="product-box-discount">{originalPrice}</p>
            <p id="product-box-price">£{this.props.product.getPrice()}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <button id="product-box-add-button" disabled={this.checkStockLevel()} onClick={this.handleClick} id="product-button">Add</button>
            </div>
          </div>

          </div>
        </div>
      )}

  })

module.exports = ProductBox;