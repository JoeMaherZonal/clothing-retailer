var React = require('react')
var OptionsBox = require('./option_components/options_box')
var ProductList = require('./product_display_components/product_list')
var ProductManager = require('../models/product_manager')
var _ = require('lodash')
var ShoppingBasket = require('../models/shopping_basket')
var DiscountVoucher = require('../models/discount_voucher')

var AppBox = React.createClass({

  getInitialState: function(){
    return {
      productManager: null,
      shoppingBasket: new ShoppingBasket(),
    }
  },

  loadDataFromAPI: function(){
    var url = "http://localhost:5000/data"
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onload = function(){
      if(request.status === 200){
        var data = JSON.parse(request.responseText)
        this.createProductManager(data)
        this.createValidVouchers()
      }
    }.bind(this)
    request.send(null)
  },

  addItemToBasket: function(product) {
    var shoppingBasket = this.state.shoppingBasket
    var productManager = this.state.productManager
    shoppingBasket.addItem(product)
    productManager.decreaseQuantity(product)
    this.setState({productManager: productManager})
    this.setState({shoppingBasket: shoppingBasket})
  },

  //TODO
  // loadPreviousShoppingData: function(){
  //   var previousShopping = JSON.parse(localStorage.getItem('shoppingBasket')) || []
  //   var previousVoucher = JSON.parse(localStorage.getItem('voucher')) || null
  //   var currentShoppingBasket = this.state.shoppingBasket
  //   currentShoppingBasket.items = previousShopping
  //   currentShoppingBasket.voucher = previousVoucher
  //   this.setState({shoppingBasket: currentShoppingBasket })
  // },

  // saveCurrentShopping: function(){
  //   var currentShopping = this.state.shoppingBasket.items
  //   var currentVoucher = this.state.shoppingBasket.voucher
  //   localStorage.setItem('shoppingBasket', JSON.stringify(allResults));
  // },

  removeItemFromBasket: function(product){
    var shoppingBasket = this.state.shoppingBasket
    var productManager = this.state.productManager
    if(product.code){
      shoppingBasket.clearVoucher()
    }
    productManager.returnProduct(product)
    shoppingBasket.removeItem(product)
    this.setState({shoppingBasket: shoppingBasket})
  },

  createShoppingBasket: function(){
    var shoppingBasket = new ShoppingBasket()
    this.setState({shoppingBasket: shoppingBasket})
  },

  readyState: function() {
    this.createShoppingBasket()
    this.loadPreviousShoppingData()
  },

  componentDidMount(){
    this.readyState()
    this.loadDataFromAPI()
  },

  findVoucher: function(code){
    this.state.productManager.getVoucher(code)
  },

  addVoucher: function(code){
    var shoppingBasket = this.state.shoppingBasket
    if(this.findVoucher(code)){
      shoppingBasket.addDiscountVoucher(this.findVoucher(code))
    }
    this.setState({shoppingBasket: shoppingBasket})
  },

  createProductManager: function(data){
    var productManager = new ProductManager()
    for(var product of data){
      productManager.addProduct({name: product.name, price: product.price, category: product.category, colour: product.colour, quantity: product.quantity, discount: product.discount})
    }
    this.setState({productManager: productManager})
  },

  productsToDisplay: function(){
    var productManager = this.state.productManager || new ProductManager()
      return productManager.products
  },

  updateShoppingBasket: function(shoppingBasket){
    this.setState({shoppingBasket: shoppingBasket})
  },

  updateProductManager: function(productManager){
    this.setState({productManager: productManager})
  },

  //TODO - isolate and tidyup
  createValidVouchers: function(){
    var discountVoucher1 = new DiscountVoucher("5OFF", function(items){
      var totalSpend = _.sumBy(items, function(product) { return product.price; })
      if(totalSpend > 5){
        return 5
      }
      return 0
    }, "£5 off any order")
    var discountVoucher2 = new DiscountVoucher("10OFF", function(items){
      var totalSpend = _.sumBy(items, function(o) { return o.price; })
      if(totalSpend > 50){
        return 10;
      }else{
        return 0;
      }
    }, "£10 off when you spend £50")
    var discountVoucher3 = new DiscountVoucher("15OFF", function(items){
      var totalSpend = _.sumBy(items, function(product) { return product.price; })
      var hasItemWithCategory = false
      for(var item of items){
          var catArray = item.categorys.split(/(\s)/)
          if(catArray[2] === "Footwear"){
            hasItemWithCategory = true
          }
      }
      if(totalSpend > 75 && hasItemWithCategory){
        return 15;
      }else{
        //invalid
        return 0;
      }
    }, "£15 off when you buy footwear and spend £75")
    var productManager = this.state.productManager
    productManager.setVouchers([discountVoucher1, discountVoucher2, discountVoucher3])
    this.setState({productManager: productManager})
  },

  render: function(){

    return(
      <div className="row" id='app-container'>
      <div className="col-12">

        <div className="row">
          <div className="col-12">
            <OptionsBox updateFilter={this.updateFilter} shoppingBasket = {this.state.shoppingBasket} removeItemFromBasket={this.removeItemFromBasket} addVoucher={this.addVoucher} updateShoppingBasket={this.updateShoppingBasket} productManager={this.state.productManager} updateProductManager={this.updateProductManager}/>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <ProductList products = {this.productsToDisplay} addItemToBasket={this.addItemToBasket} />
          </div>
        </div>

      </div>
      </div>
      )}

  })

module.exports = AppBox;