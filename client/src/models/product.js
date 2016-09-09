

var Product = function(params){
  this.name = params.name,
  this.categorys = params.category,
  this.colour = params.colour,
  this.price = parseFloat(params.price)
  this.quantity = params.quantity
  this.discount = parseFloat(params.discount)
}

Product.prototype = {

  isOfCategory: function(categoryStr){
    for(var category of this.categorys){
      if(category === categoryStr){
        return true
      }
    }
    return false
  },

  getPrice: function(){
    var price = this.price - this.discount
    return price.toFixed(2)
  }

}

module.exports = Product;