var Product = require('./product')
var _ = require('lodash')

var ProductManager = function(){
  this.products = []
}

ProductManager.prototype = {

  addProduct: function(params){
    //prevents invalid objects becoming stock
    if(!params.name || !params.price || !params.category || !params.colour){
      return
    }
    this.products.push(new Product(params))
  },

  removeProduct: function(product){
    var index = this.products.indexOf(product)
    this.products.splice(index, 1)
  },

  productsOfCat: function(category){
    var filteredProducts = this.products.filter(function(p){
      return p.isOfCategory(category)
    })
    return filteredProducts
  },

  productByName: function(name){
    if(this.products.length === 0){return}
    for(product of this.products){
      if(product.name === name){
        return product
      }
    }
  }

}

module.exports = ProductManager;