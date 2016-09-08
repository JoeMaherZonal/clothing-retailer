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

  decreaseQuantity: function(product){
    var product = this.findProduct(product)
    if(product.quantity < 1){return}
    var index = this.products.indexOf(product)
    this.products[index].quantity -= 1

  },

  removeProduct: function(product){
    var index = this.products.indexOf(product)
    this.products.splice(index, 1)
  },

  productsOfCat: function(category){
    var filteredProducts = this.products.filter(function(product){
      return product.isOfCategory(category)
    })
    return filteredProducts
  },

  findProduct: function(product){
    var index = this.products.indexOf(product)
    return this.products[index]
  }

}

module.exports = ProductManager;