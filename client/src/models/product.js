

var Product = function(params){
  this.name = params.name,
  this.categorys = params.category,
  this.colour = params.colour,
  this.price = parseInt(params.price)
}

Product.prototype = {

  isOfCategory: function(categoryStr){
    for(var category of this.categorys){
      if(category === categoryStr){
        return true
      }
    }
    return false
  }

}

module.exports = Product;