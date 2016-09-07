var React = require('react')
var TitleBox = require('./title_box')
var OptionsBox = require('./option_components/options_box')
var ProductList = require('./product_display_components/product_list')
var ProductManager = require('../models/product_manager')
var _ = require('lodash')

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
      productManager: null
    }
  },

  componentWillMount(){
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

        <div className="row">
          <div className="col-12">
            <TitleBox />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <OptionsBox updateFilter={this.updateFilter}/>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <ProductList products = {this.productsToDisplay} />
          </div>
        </div>

      </div>
      )}

  })

module.exports = AppBox;