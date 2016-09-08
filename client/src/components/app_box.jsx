var React = require('react')
var TitleBox = require('./title_box')
var OptionsBox = require('./option_components/options_box')
var ProductList = require('./product_display_components/product_list')
var ProductManager = require('../models/product_manager')
var _ = require('lodash')
var ShoppingBasket = require('../models/shopping_basket')

var AppBox = React.createClass({

  getInitialState: function(){
    return {
      selectedFilters: [
      {id: "men", selected: false},
      {id: "women", selected: false},
      {id: "casual", selected: false},
      {id: "formal", selected: false},
      {id: "footwear", selected: false}
      ],
      productManager: null,
      shoppingBasket: new ShoppingBasket()
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
      }
    }.bind(this)
    request.send(null)
  },

  addItemToBasket: function(product) {
    this.state.shoppingBasket.addItem(product)
    var array = ["one", "two", "three"];
  },

  loadPreviousShoppingData: function(){
    var previousShopping = JSON.parse(localStorage.getItem('shoppingBasket')) || []
    var previousVoucher = JSON.parse(localStorage.getItem('voucher')) || null
    var currentShoppingBasket = this.state.shoppingBasket
    currentShoppingBasket.items = previousShopping
    currentShoppingBasket.voucher = previousVoucher
    this.setState({shoppingBasket: currentShoppingBasket })
  },

  saveCurrentShopping: function(){
    var currentShopping = this.state.shoppingBasket.items
    var currentVoucher = this.state.shoppingBasket.voucher
    localStorage.setItem('shoppingBasket', JSON.stringify(allResults));
  },

  removeItemFromBasket: function(product){
    var shoppingBasket = this.state.shoppingBasket
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
    setInterval(this.loadDataFromAPI, 500)
  },

  addVoucher: function(code){
    var shoppingBasket = this.state.shoppingBasket
    shoppingBasket.addVoucher()
  },

  createProductManager: function(data){
    var productManager = new ProductManager()
    for(var product of data){
      productManager.addProduct({name: product.name, price: product.price, category: product.category, colour: product.colour})
    }
    this.setState({productManager: productManager})
  },

  updateFilter: function(target){
    var filter = this.state.selectedFilters.map(function(filter) {
      var selected = filter.selected
      if(target.id === filter.id){
        if(selected){
          selected = false
        }else{
          selected = true
        }
      }
      return {
        id: filter.id,
        selected: selected
        };
    })
    this.setState({selectedFilters: filter})
  },

  productsToDisplay: function(){
    var productManager = this.state.productManager || new ProductManager()
    if(!this.checkForNoFilteres()){
      return productManager.products
    }
    var filteredProducts = []
    for(var filter of this.state.selectedFilters){
      if(filter.selected){
         filteredProducts = filteredProducts.concat(productManager.productsOfCat(filter.id))
      }
    }
    return _.uniqBy(filteredProducts, function(element){
      return element.name
    })
  },

  checkForNoFilteres: function(){
    for(var filter of this.state.selectedFilters){
      if(filter.selected){return true}
    }
    return false
  },

  render: function(){
    return(
      <div className="row" id='app-container'>
      <div className="col-12">

        <div className="row">
          <div className="col-12">
            <TitleBox />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <OptionsBox updateFilter={this.updateFilter} shoppingBasket = {this.state.shoppingBasket} removeItemFromBasket={this.removeItemFromBasket} applyVoucher={this.applyVoucher}/>
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