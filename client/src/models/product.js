

var Product = function(params){
  this.name = params.name,
  this.category = params.category,
  this.colour = params.colour,
  this.price = parseInt(params.price)
}

Product.prototype = {

}

module.exports = Product;